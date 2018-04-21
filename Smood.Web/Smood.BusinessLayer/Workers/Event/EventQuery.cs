using Smood.BusinessLayer.Base.Workers;
using Smood.BusinessLayer.Workers.Event.DTO;
using Smood.DataLayer.Context;
using System.IO;
using System.Linq;

namespace Smood.BusinessLayer.Workers.Event
{
    public class EventQuery : BaseWorker
    {
        public EventQuery(DatabaseContext context) : base(context) {}

        public IQueryable<EventListDTO> GetAll(string basePath)
        {
            //var basePath = Directory.GetCurrentDirectory();
            return DatabaseContext.Events.Where(e => e.DeleteDate == null).Select(e => new EventListDTO
            {
                EventId = e.EventId,
                Name = e.Name,
                ImageUrl = e.ImagePath.Replace(basePath, "").Replace("\\", "/")
            });
        }

        public EventUpdateDTO GetById(int eventId, string basePath)
        {
            //var basePath = Directory.GetCurrentDirectory();
            return DatabaseContext.Events.Where(e => e.DeleteDate == null).Select(e => new EventUpdateDTO
            {
                EventId = e.EventId,
                Name = e.Name,
                Description = e.Description,
                Location = e.Location,
                ImageUrl = e.ImagePath.Replace(basePath, "").Replace("\\", "/"),
                PhotoUrls = e.EventPhotos.Select(p => p.FilePath.Replace(basePath, "").Replace("\\", "/"))
            }).FirstOrDefault();
        }

        //publi
    }
}
