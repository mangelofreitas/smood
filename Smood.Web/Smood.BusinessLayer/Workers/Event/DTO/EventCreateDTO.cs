using Smood.DataLayer.Models;

namespace Smood.BusinessLayer.Workers.Event.DTO
{
    public class EventCreateDTO : EventUpdateDTO
    {
        public byte[] ImageData { get; set; }

        public string ImageName { get; set; }
    }
}
