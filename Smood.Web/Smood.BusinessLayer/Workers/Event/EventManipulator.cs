using Smood.BusinessLayer.Base.Workers;
using Smood.DataLayer.Context;
using System.Linq;
using Smood.DataLayer.Models;
using Smood.BusinessLayer.Workers.Event.DTO;
using System;

namespace Smood.BusinessLayer.Workers.Event
{
    public class EventManipulator : BaseWorker
    {
        public EventManipulator(DatabaseContext context) : base(context) {}

        public EventUpdateDTO Save(EventUpdateDTO dto, int? eventId = null)
        {
            var @event = eventId == null
                            ? DatabaseContext.Events.Add(new SmoodEvent()).Entity
                            : DatabaseContext.Events.FirstOrDefault(e => e.EventId == eventId && e.DeleteDate == null);

            dto.ApplyChanges(@event);
                        
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
    }
}
