using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantProjectDomain.Repository;
using PlantProjectDomain.Domain;

namespace PlantProjectC.Controllers {
    [Route("api/[controller]")]
    public class ConservationController : Controller
    {
        private readonly IRepository _repository;
        public ConservationController(IRepository repository) {
            _repository = repository;
        }

        [HttpGet]
        public List<Conservation> Get() {
            return _repository.Conservations.ToList();
        }
    }
}