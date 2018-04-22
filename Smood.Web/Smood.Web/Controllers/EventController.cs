using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Smood.BusinessLayer.Workers.Event;
using Smood.BusinessLayer.Workers.Event.DTO;
using Smood.DataLayer.Context;
using Smood.Web.Base.Controllers;
using Smood.Web.Base.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Smood.Web.Controllers
{
    public class EventController : BaseController
    {
        private readonly EventQuery _query = null;
        private readonly EventManipulator _manipulator = null;
        private readonly SmoodSettings _settings = null;
        private readonly IHostingEnvironment _environment = null;

        public EventController(IHostingEnvironment environment, IOptions<SmoodSettings> smoodSettings, DatabaseContext context) : base(context)
        {
            _query = new EventQuery(context);
            _manipulator = new EventManipulator(context);
            _settings = smoodSettings.Value;
            _environment = environment;
        }

        [HttpGet]
        public IQueryable<EventListDTO> Get()
        {
            return _query.GetAll(_environment.WebRootPath);
        }

        [HttpGet("{eventId}")]
        public EventUpdateDTO GetById(int eventId)
        {
            return _query.GetById(eventId, basePath: _environment.WebRootPath);
        }

        [HttpPost]
        public EventUpdateDTO Post([FromBody]EventCreateDTO dto)
        {
            return _manipulator.Save(dto, basePath: _environment.WebRootPath);
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

        [HttpPost("{eventId}/photo")]
        public IActionResult PostPhoto(int eventId, ICollection<IFormFile> files)
        {
            _manipulator.SaveEventPhotos(eventId, _environment.WebRootPath, files);

            return Ok();
        }

        [HttpGet("{eventId}/emotions-timeline")]
        public ChartDTO GetEmotionsTimeline(int eventId, DateTime startDate, DateTime endDate)
        {
            return _query.GetEmotionsByRange(eventId, startDate, endDate);
        }
    }
}
