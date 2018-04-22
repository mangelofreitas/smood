using Smood.BusinessLayer.Workers.Event.DTO.DataViz;
using Smood.BusinessLayer.Workers.Event.DTO.ElasticSearch;
using Smood.DataLayer.Models;
using System;
using System.Collections.Generic;

namespace Smood.BusinessLayer.Workers.Event.DTO
{
    public class EventUpdateDTO : EventListDTO
    {
        public string Description { get; set; }

        public string Location { get; set; }

        public IEnumerable<string> PhotoUrls { get; set; }

        public string Code { get; set; }

        public AvgAge AvgAge { get; set; }

        public PieDTO GenderCount { get; set; }

        public int FacesCount { get; set; }

        public int PhotosCount { get; set; }

        #region Apply Changes

        public void ApplyChanges(SmoodEvent entity, bool isNew)
        {
            entity.Name = Name;
            entity.Description = Description;
            entity.Location = Location;

            entity.StartDate = StartDate;
            entity.EndDate = EndDate;

            if (isNew)
            {
                entity.Code = Code;
                entity.CreateDate = DateTime.Now;
            }
        }

        #endregion
    }
}
