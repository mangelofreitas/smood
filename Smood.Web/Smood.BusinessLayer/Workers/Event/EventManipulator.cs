using Smood.BusinessLayer.Base.Workers;
using Smood.DataLayer.Context;
using System.Linq;
using Smood.DataLayer.Models;
using Smood.BusinessLayer.Workers.Event.DTO;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using System.Net;
using System.Runtime.Serialization.Json;
using Smood.BusinessLayer.Workers.Event.ElasticSearch;
using System.Text.RegularExpressions;
using System.Drawing;
using System.Drawing.Imaging;
using System.Text;
//using System.Drawing;

namespace Smood.BusinessLayer.Workers.Event
{
    public class EventManipulator : BaseWorker
    {
        public EventManipulator(DatabaseContext context) : base(context) { }

        #region Private Method

        //we init this once so that if the function is repeatedly called
        //it isn't stressing the garbage man
        private static Regex r = new Regex(":");

        //retrieves the datetime WITHOUT loading the whole image
        private static DateTime GetDateTakenFromImage(MemoryStream inStream)
        {
            return DateTime.Now;
            using (var myImage = new Bitmap(Image.FromStream(inStream)))
            {
                PropertyItem propItem = myImage.GetPropertyItem(36867);
                string dateTaken = r.Replace(Encoding.UTF8.GetString(propItem.Value), "-", 2);
                return DateTime.Parse(dateTaken);
            }
        }

        private void ProcessFilesToAws(Stream fileStream, string fileName, string awsAccessKeyId, string awsSecretAccessKey)
        {
            var fileTransferUtility = new TransferUtility(new AmazonS3Client(awsAccessKeyId, awsSecretAccessKey, RegionEndpoint.EUWest1));
            fileTransferUtility.Upload(fileStream, "shiftappens", fileName);
        }

        private void SaveFileToElasticSearch(string elasticSearchFileSaverUrl, PostFiles filesToPost)
        {
            var request = WebRequest.Create(elasticSearchFileSaverUrl);
            request.Method = "POST";
            request.ContentType = "application/json";

            using (var requestStream = request.GetRequestStream())
            {
                var ser = new DataContractJsonSerializer(filesToPost.GetType());
                ser.WriteObject(requestStream, filesToPost);

                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    using (var reader = new StreamReader(response.GetResponseStream()))
                    {
                    }
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

        public IEnumerable<string> SaveEventPhotos(int eventId, IHostingEnvironment environment, IFormFileCollection files, string awsAccessKeyId, string awsSecretAccessKey, string elasticSearchFileSaverUrl)
        {
            var newUrlList = new List<string>();

            var filesToPost = new PostFiles
            {
                EventId = eventId,
                Files = new List<FileMetadata>()
            };
            var urlListToElasticSearch = new List<string>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var newFileName = "event" + eventId + "-" + Path.GetFileNameWithoutExtension(file.FileName) + "-" + Guid.NewGuid() + Path.GetExtension(file.FileName);

                    using (var stream = new MemoryStream())
                    {
                        file.CopyTo(stream);
                        stream.Seek(0, SeekOrigin.Begin);
                        ProcessFilesToAws(stream, newFileName, awsAccessKeyId, awsSecretAccessKey);
                    }

                    using (var stream = new MemoryStream())
                    {
                        file.CopyTo(stream);
                        stream.Seek(0, SeekOrigin.Begin);
                        filesToPost.Files.Add(new FileMetadata
                        {
                            Name = newFileName,
                            CreateDate = GetDateTakenFromImage(stream)
                        });
                    }


                    var newFileUrl = "http://s3-eu-west-1.amazonaws.com/shiftappens/" + newFileName;

                    DatabaseContext.EventPhotos.Add(new EventPhoto
                    {
                        EventId = eventId,
                        FileName = file.FileName,
                        FilePath = newFileUrl,
                        FileType = file.ContentType
                    });

                    newUrlList.Add(newFileUrl);
                }
            }

            if (files.Count() > 0)
            {
                DatabaseContext.SaveChanges();

                SaveFileToElasticSearch(elasticSearchFileSaverUrl, filesToPost);
            }

            return newUrlList;
        }
    }
}
