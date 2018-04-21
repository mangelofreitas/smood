using Smood.DataLayer.Models;
using System.Collections.Generic;

namespace Smood.BusinessLayer.Workers.Event.DTO
{
    public class EventUpdateDTO : EventListDTO
    {
        public string Description { get; set; }

        public string Location { get; set; }

        public IEnumerable<string> PhotoUrls { get; set; }

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
