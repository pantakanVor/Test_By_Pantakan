using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using API.Model;
using API;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private IPersonService _personService;
        private readonly AppSettings _appSettings;

        public PersonController(
            IPersonService personService,
            IOptions<AppSettings> appSettings)
        {
            _personService = personService;
            _appSettings = appSettings.Value;
        }
 
        [HttpGet]
        public IActionResult Person()
        {

            return Ok(_personService.Get());
        }


        [HttpPost]
        public IActionResult Add(PersonModel model)
        {
            var response = _personService.Add(model);
            return Ok(response);
        }


        [HttpPut]
        public IActionResult Update(PersonModel model)
        {
            var response = _personService.Update(model);
            return Ok(response);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var response = _personService.Delete(id);
            return Ok(response);
        }
    }
}
