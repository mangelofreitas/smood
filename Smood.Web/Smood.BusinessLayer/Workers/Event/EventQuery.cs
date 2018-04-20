using Smood.BusinessLayer.Base.Workers;
using Smood.DataLayer.Context;
using System.Linq;

namespace Smood.BusinessLayer.Workers.Event
{
    public class EventQuery : BaseWorker
    {
        public EventQuery(DatabaseContext context) : base(context) {}

        public IQueryable<string> GetAll()
        {
            return DatabaseContext.Events.Select(e => e.Name);
        }
    }
}
