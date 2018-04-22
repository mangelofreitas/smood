using System.Collections.Generic;

namespace Smood.BusinessLayer.Workers.Event.ElasticSearch.EmotionsByDayAvgAux
{
    public class GroupByHour
    {
        public IEnumerable<Bucket> buckets { get; set; }
    }
}
