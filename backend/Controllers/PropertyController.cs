using immobilier_backend.Models;
using immobilier_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace immobilier_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;

        public PropertyController(PropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<List<Property>> Get()
        {
            return await _propertyService.GetAsync();
        }
    }
}