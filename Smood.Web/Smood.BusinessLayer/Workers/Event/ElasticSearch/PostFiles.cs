using System.Collections.Generic;

namespace Smood.BusinessLayer.Workers.Event.ElasticSearch
{
    public class PostFiles
    {
        public int EventId { get; set; }

        public List<FileMetadata> Files { get; set; }
    }
}
