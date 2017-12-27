using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantProjectDomain.Domain;
using PlantProjectDomain.Repository;

namespace PlantProjectC.Controllers
{
    [Route("api/[controller]")]
    public class GenusController : Controller
    {
        private readonly IRepository _repository;
        public GenusController(IRepository repository) {
            _repository = repository;
        }
        [HttpGet]
        public List<Genus> Get() {
            return _repository.Genus.ToList();
        }
    }
}