using System.Collections.Generic;

namespace Smood.BusinessLayer.Workers.Event.DTO
{
    public class ChartDTO
    {
        public List<string> Labels { get; set; }

        public List<ChartSeriesDTO> Series { get; set; }
    }
}
