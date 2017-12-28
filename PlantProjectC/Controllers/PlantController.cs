using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlantProjectDomain.Repository;
using PlantProjectDomain.Domain;
using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using PlantProjectC.Models;

namespace PlantProjectC.Controllers {
    [Route("api/[controller]")]
    public class PlantController : Controller {

        private readonly IRepository _repository;
        public PlantController(IRepository repository) {
            _repository = repository;
        }

        [HttpGet("{id}")]
        public PlantModel Get(int id) {
            var plant = _repository.Plants.Include(d => d.Conservation).Include(d => d.Family).Include(d => d.Genus)
                .Where(p => p.Id == id).Select(p => new PlantModel {
                    Name = p.Name,
                    LatinName = p.LatinName,
                    Conservation = p.Conservation.Name,
                    Family = p.Family.Name,
                    Genus = p.Genus.Name,
                    Id = p.Id
                }).FirstOrDefault();
            return plant;
        }

        [HttpGet]
        public List<PlantModel> Get() {
            var plants = _repository.Plants.Include(d => d.Conservation).Include(d => d.Family).Include(d => d.Genus).Select(p => new PlantModel {
                Name = p.Name,
                LatinName = p.LatinName,
                Conservation = p.Conservation.Name,
                Family = p.Family.Name,
                Genus = p.Genus.Name,
                Id = p.Id
            }).ToList();
            return plants;
        }

        [HttpPost]
        public ResponseModel Post([FromBody] PlantModel plant) {
            var response = new ResponseModel {
                IsError = false
            };
            if (string.IsNullOrEmpty(plant.Name)) {
                response.IsError = true;
                response.ErrorMessage = "Please add name.";
            }
            if (string.IsNullOrEmpty(plant.LatinName)) {
                response.IsError = true;
                response.ErrorMessage = "Please add latin name.";
            }
            var conservation = _repository.Conservations.Where(c => c.Name == plant.Conservation).FirstOrDefault();
            if (conservation == null) {
                response.IsError = true;
                response.ErrorMessage = "Please select conservation.";
            }
            var family = _repository.Familys.Where(c => c.Name == plant.Family).FirstOrDefault();
            if (family == null) {
                response.IsError = true;
                response.ErrorMessage = "Please select family.";
            }
            var genus = _repository.Genus.Where(c => c.Name == plant.Genus).FirstOrDefault();
            if (genus == null) {
                response.IsError = true;
                response.ErrorMessage = "Please select genus.";
            }
            if (!response.IsError) {
                var newplant = new Plant() {
                    Name = plant.Name,
                    LatinName = plant.LatinName,
                    Conservation = conservation,
                    Family = family,
                    Genus = genus
                };
                _repository.AddPlant(newplant);
                _repository.SaveChanges();
            }
            return response;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id) {
            var plant = _repository.Plants.Where(p => p.Id == id).FirstOrDefault();
            _repository.RemovePlant(plant);
            _repository.SaveChanges();
            return StatusCode(204);
        }

        [HttpPut]
        public ResponseModel Edit([FromBody] PlantModel plant) {
            var response = new ResponseModel {
                IsError = false
            };
            var editablePlant = _repository.Plants.Include(p => p.Genus).Include(p => p.Family).Include(p => p.Conservation)
                .Where(p => p.Id == plant.Id).FirstOrDefault();
            if (string.IsNullOrEmpty(plant.LatinName)) {
                response.IsError = true;
                response.ErrorMessage = "Please add latin name.";
            } else if (editablePlant.LatinName != plant.LatinName) {
                editablePlant.LatinName = plant.LatinName;
            }
            if (string.IsNullOrEmpty(plant.Name)) {
                response.IsError = true;
                response.ErrorMessage = "Please add name.";
            } else if (editablePlant.Name != plant.Name) {
                editablePlant.Name = plant.Name;
            }
            if (editablePlant.Genus == null || editablePlant.Genus.Name != plant.Genus) {
                var selectedGenus = _repository.Genus.Where(g => g.Name == plant.Genus).FirstOrDefault();
                if (selectedGenus == null) {
                    response.IsError = true;
                    response.ErrorMessage = "Please select genus.";
                } else {
                    editablePlant.Genus = selectedGenus;
                }
            }
            if (editablePlant.Conservation == null || editablePlant.Conservation.Name != plant.Conservation) {
                var selectedConservation = _repository.Conservations.Where(g => g.Name == plant.Conservation).FirstOrDefault();
                if (selectedConservation == null) {
                    response.IsError = true;
                    response.ErrorMessage = "Please select conservation.";
                } else {
                    editablePlant.Conservation = selectedConservation;
                }
            }
            if (editablePlant.Family == null || editablePlant.Family.Name != plant.Family) {
                var selectedFamily = _repository.Familys.Where(g => g.Name == plant.Family).FirstOrDefault();
                if (selectedFamily == null) {
                    response.IsError = true;
                    response.ErrorMessage = "Please select family.";
                } else {
                    editablePlant.Family = selectedFamily;
                }
            }
            if (!response.IsError) {
                _repository.SaveChanges();
            }
            return response;
        }
    }
}
