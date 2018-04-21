using System;

namespace Smood.BusinessLayer.Workers.Event.DTO
{
    public class EventListDTO
    {
        public int EventId { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
