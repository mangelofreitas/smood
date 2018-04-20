using Microsoft.AspNetCore.Mvc;
using Smood.DataLayer.Context;

namespace Smood.Web.Base.Controllers
{
    [Route("api/[controller]")]
    public abstract class BaseController : Controller
    {
        //protected readonly DatabaseContext DatabaseContext;

        protected readonly DatabaseContext DatabaseContext;

        public BaseController(DatabaseContext context)
        {
            DatabaseContext = context;
        }
    }

    //public abstract class BaseController<IQUERY> : BaseController where IQUERY : new()
    //{
    //    protected readonly IQUERY Query = default(IQUERY);

    //    public BaseController(DatabaseContext context) : base(context)
    //    {
    //        Query = new IQUERY();
    //    }
    //}
}
