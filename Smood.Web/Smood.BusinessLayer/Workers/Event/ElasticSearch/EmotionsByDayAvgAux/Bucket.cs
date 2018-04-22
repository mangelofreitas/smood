namespace Smood.BusinessLayer.Workers.Event.ElasticSearch.EmotionsByDayAvgAux
{
    public class Bucket
    {
        public Avg avgHappy { get; set; }

        public Avg avgAngry { get; set; }

        public Avg avgSad { get; set; }

        public Avg avgUnkwow { get; set; }

        public Avg avgCalm { get; set; }

        public Avg avgDigusted { get; set; }

        public Avg avgSurprised { get; set; }

        public Avg avgConfused { get; set; }
    }
}
