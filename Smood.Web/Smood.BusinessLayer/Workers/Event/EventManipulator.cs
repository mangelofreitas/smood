using Smood.BusinessLayer.Base.Workers;
using Smood.DataLayer.Context;
using System.Linq;
using Smood.DataLayer.Models;
using Smood.BusinessLayer.Workers.Event.DTO;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Smood.BusinessLayer.Workers.Event
{
    public class EventManipulator : BaseWorker
    {
        public EventManipulator(DatabaseContext context) : base(context) {}

        public EventUpdateDTO Save(EventCreateDTO dto, string basePath)
        {
            string finalPath = null;

            if (dto.ImageData != null)
            {
                var uploads = Path.Combine(basePath, "content/photo-uploads");
                finalPath = Path.Combine(uploads, "main-" + Guid.NewGuid());

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

            dto.ApplyChanges(@event);
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

        public void SaveEventPhotos(int eventId, string basePath, ICollection<IFormFile> files)
        {
            var uploads = Path.Combine(basePath, "content/photo-uploads/event-" + eventId);
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var finalPath = Path.Combine(uploads, file.FileName + "-" + Guid.NewGuid());

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
                }
            }

            if (files.Count() > 0)
            {
                DatabaseContext.SaveChanges();
            }
        }
    }
}
