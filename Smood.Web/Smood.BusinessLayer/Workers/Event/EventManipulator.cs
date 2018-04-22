using Smood.BusinessLayer.Base.Workers;
using Smood.DataLayer.Context;
using System.Linq;
using Smood.DataLayer.Models;
using Smood.BusinessLayer.Workers.Event.DTO;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;

namespace Smood.BusinessLayer.Workers.Event
{
    public class EventManipulator : BaseWorker
    {
        public EventManipulator(DatabaseContext context) : base(context) {}

        #region Private Method

        public void ProcessFilesToAws(string pathToRead, string pythonFilePath)
        {
            var start = new ProcessStartInfo();
            start.FileName = "C:/ProgramData/Anaconda3/python.exe";
            start.Arguments = string.Format("{0} {1} {2}", pythonFilePath, pathToRead, "shiftappens");
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    Console.Write(result);
                }
            }
        }
        
        #endregion

        public EventUpdateDTO Save(EventCreateDTO dto, string basePath)
        {
            string finalPath = null;

            if (dto.ImageData != null)
            {
                var uploads = Path.Combine(basePath, "content/photo-uploads");
                finalPath = Path.Combine(uploads, "main-" + Guid.NewGuid() + Path.GetExtension(dto.ImageName));

                using (var fileStream = new FileStream(finalPath, FileMode.Create))
                {
                    using (var memoryStream = new MemoryStream(dto.ImageData))
                    {
                        memoryStream.CopyTo(fileStream);
                    }
                }
            }

            dto.EventId = Save(dto, ImagePath: finalPath).EventId;

            return dto;
        }

        public EventUpdateDTO Save(EventUpdateDTO dto, int? eventId = null, string ImagePath = null)
        {
            var @event = eventId == null
                            ? DatabaseContext.Events.Add(new SmoodEvent()).Entity
                            : DatabaseContext.Events.FirstOrDefault(e => e.EventId == eventId && e.DeleteDate == null);

            dto.ApplyChanges(@event, eventId == null);
            @event.ImagePath = ImagePath;

            DatabaseContext.SaveChanges();

            dto.EventId = @event.EventId;

            return dto;
        }

        public void Delete(int eventId)
        {
            var @event = DatabaseContext.Events.FirstOrDefault(e => e.EventId == eventId && e.DeleteDate == null);

            @event.DeleteDate = DateTime.Now;
            //DatabaseContext.Events.Remove(@event);

            DatabaseContext.SaveChanges();
        }

        public IEnumerable<string> SaveEventPhotos(int eventId, IHostingEnvironment environment, IFormFileCollection files, string awsAccessKeyId, string awsSecretAccessKey)
        {
            var basePhotoUrl = "content/photo-uploads/event-" + eventId;

            var newUrlList = new List<string>();

            var uploads = Path.Combine(environment.WebRootPath, basePhotoUrl, Guid.NewGuid().ToString());
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var finalPath = Path.Combine(uploads, file.FileName);

                    Directory.CreateDirectory(uploads);
                    using (var fileStream = new FileStream(finalPath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }

                    DatabaseContext.EventPhotos.Add(new EventPhoto
                    {
                        EventId = eventId,
                        FileName = file.FileName,
                        FilePath = finalPath,
                        FileType = file.ContentType
                    });

                    newUrlList.Add(finalPath.Replace(environment.WebRootPath, "").Replace("\\", "/"));
                }
            }

            if (files.Count() > 0)
            {
#if DEBUG
                //ProcessFilesToAws(uploads, Path.Combine(environment.ContentRootPath, "Python/camera/upload.py"));
#endif

                DatabaseContext.SaveChanges();
            }

            return newUrlList;
        }
    }
}
