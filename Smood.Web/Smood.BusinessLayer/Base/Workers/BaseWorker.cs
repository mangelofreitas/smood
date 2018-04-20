using Smood.DataLayer.Context;

namespace Smood.BusinessLayer.Base.Workers
{
    public abstract class BaseWorker
    {
        protected DatabaseContext DatabaseContext = null;

        public BaseWorker(DatabaseContext context)
        {
            DatabaseContext = context;
        }
    }
}
