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
    public class FamilyController : Controller {
        private readonly IRepository _repository;
        public FamilyController(IRepository repository) {
            _repository = repository;
        }

        [HttpGet]
        public List<Family> Get() {
            var families = _repository.Familys.ToList();
            families.Insert(0, new Family {
                Name = "--Select--",
                Id = 0
            });
            return families;
        }
    }
}