using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Smood.BusinessLayer.Workers.Event;
using Smood.BusinessLayer.Workers.Event.DTO;
using Smood.DataLayer.Context;
using Smood.Web.Base.Controllers;
using Smood.Web.Base.Settings;
using System.Linq;

namespace Smood.Web.Controllers
{
    public class EventController : BaseController
    {
        private readonly EventQuery _query = null;
        private readonly EventManipulator _manipulator = null;
        private readonly SmoodSettings _settings = null;

        public EventController(IOptions<SmoodSettings> smoodSettings, DatabaseContext context) : base(context)
        {
            _query = new EventQuery(context);
            _manipulator = new EventManipulator(context);
            _settings = smoodSettings.Value;
        }

        [HttpGet]
        public IQueryable<EventListDTO> Get()
        {
            return _query.GetAll(/*_settings.ImageUploadFolder*/);
        }

        [HttpGet("{eventId}")]
        public EventUpdateDTO GetById(int eventId)
        {
            return _query.GetById(eventId);
        }

        [HttpPost]
        public EventUpdateDTO Post([FromBody]EventUpdateDTO dto)
        {
            return _manipulator.Save(dto);
        }

        [HttpPut("{eventId}")]
        public EventUpdateDTO Put(int eventId, [FromBody]EventUpdateDTO dto)
        {
            return _manipulator.Save(dto, eventId);
        }

        [HttpDelete("{eventId}")]
        public void Delete(int eventId)
        {
            _manipulator.Delete(eventId);
        }
    }
}