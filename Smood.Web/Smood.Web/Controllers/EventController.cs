using Smood.BusinessLayer.Workers.Event;
using Smood.DataLayer.Context;
using Smood.Web.Base.Controllers;
using System.Linq;

namespace Smood.Web.Controllers
{
    public class EventController : BaseController
    {
        private readonly EventQuery _query = null;

        public EventController(DatabaseContext context) : base(context)
        {
            _query = new EventQuery(context);
        }

        public IQueryable<string> Get()
        {
            return _query.GetAll();
        }
    }
}