using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantProjectDomain.Domain;
using PlantProjectDomain.Repository;
using PlantProjectC.Models;

namespace PlantProjectC.Controllers {
    [Route("api/[controller]")]
    public class GenusController : Controller {
        private readonly IRepository _repository;
        public GenusController(IRepository repository) {
            _repository = repository;
        }

        [HttpGet]
        public List<Genus> Get() {
            return _repository.Genus.ToList();
        }

        [HttpPost]
        public ResponseModel Post([FromBody] Genus genus) {
            var response = new ResponseModel {
                IsError = false
            };
            if (string.IsNullOrEmpty(genus.Name)) {
                response.IsError = true;
                response.ErrorMessage = "Please add name.";
            }
            try {
                _repository.AddGenus(genus);
                _repository.SaveChanges();
            } catch (Exception e) {
                response.IsError = true;
                response.ErrorMessage = "Could not save changes.";
            }
            return response;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id) {
            var genus = _repository.Genus.Where(f => f.Id == id).FirstOrDefault();
            _repository.RemoveGenus(genus);
            _repository.SaveChanges();
            return StatusCode(204);
        }
    }
}