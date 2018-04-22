using System.Collections.Generic;

namespace Smood.BusinessLayer.Workers.Event.DTO.DataViz
{
    public class PieDTO
    {
        public List<string> Labels { get; set; }

        public List<decimal> Data { get; set; }
    }
}
