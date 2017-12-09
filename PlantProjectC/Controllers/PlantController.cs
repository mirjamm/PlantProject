using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlantProjectDomain.Repository;
using PlantProjectDomain.Domain;
using System.Net.Http;

namespace PlantProjectC.Controllers {
    [Route("api/[controller]")]
    public class PlantController : Controller {

        private readonly IRepository _repository;
        public PlantController(IRepository repository) {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public List<Plant> GetPlants() {
            var plants = _repository.Plants.ToList();
            plants.Add(new Plant {
                Id = 2, Name = "test test", Conservation = new Conservation(), Familia = new Familia(),
                Family = new Family(), LatinName = "", Phylum = new Phylum()
            });
            return plants;
        }

        [HttpPost]
        public ActionResult AddPlant([FromBody] Plant plant) {
            _repository.AddPlant(new Plant {
                Name = plant.Name
            }
                );
            _repository.SaveChanges();
            return StatusCode(200);
        }
    }
}
