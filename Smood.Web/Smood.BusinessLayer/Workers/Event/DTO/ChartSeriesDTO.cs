using System.Collections.Generic;

namespace Smood.BusinessLayer.Workers.Event.DTO
{
    public class ChartSeriesDTO
    {
        public string Label { get; set; }

        public IEnumerable<decimal?> Data { get; set; }
    }
}
