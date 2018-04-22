using Elasticsearch.Net;
using Smood.BusinessLayer.Workers.Event.ElasticSearch.EmotionsByDayAvgAux;

namespace Smood.BusinessLayer.Workers.Event.ElasticSearch
{
    public class EmotionsByDayAvg
    {
        public Aggregations aggregations { get; set; }
    }
}
