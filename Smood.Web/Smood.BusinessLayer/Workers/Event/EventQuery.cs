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

        public IQueryable<EventListDTO> GetAll(/*string imagesPath*/)
        {
            //var basePath = Directory.GetCurrentDirectory();
            return DatabaseContext.Events.Where(e => e.DeleteDate == null).Select(e => new EventListDTO
            {
                EventId = e.EventId,
                ImageUrl = e.ImagePath,
                Name = e.Name
            });
        }

        public EventUpdateDTO GetById(int eventId)
        {
            //var basePath = Directory.GetCurrentDirectory();
            return DatabaseContext.Events.Where(e => e.DeleteDate == null).Select(e => new EventUpdateDTO
            {
                EventId = e.EventId,
                ImageUrl = e.ImagePath,
                Name = e.Name,
                Description = e.Description,
                Location = e.Location
            }).FirstOrDefault();
        }

        //publi
    }
}
