using Smood.DataLayer.Models;

namespace Smood.BusinessLayer.Workers.Event.DTO
{
    public class EventUpdateDTO
    {
        public int EventId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        #region Apply Changes

        public void ApplyChanges(SmoodEvent entity)
        {
            entity.Name = Name;
            entity.Description = Description;
            entity.Location = Location;
        }

        #endregion
    }
}
