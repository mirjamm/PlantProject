using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantProjectDomain.Repository;
using PlantProjectDomain.Domain;
using PlantProjectC.Models;

namespace PlantProjectC.Controllers {
    [Route("api/[controller]")]
    public class FamilyController : Controller {
        private readonly IRepository _repository;
        public FamilyController(IRepository repository) {
            _repository = repository;
        }

        [HttpGet]
        public List<Family> Get() {
            return _repository.Familys.ToList();
        }

        [HttpPost]
        public ResponseModel Post([FromBody] Family family) {
            var response = new ResponseModel {
                IsError = false
            };
            if (string.IsNullOrEmpty(family.Name)) {
                response.IsError = true;
                response.ErrorMessage = "Please add name.";
            }
            try {
                _repository.AddFamily(family);
                _repository.SaveChanges();
            } catch (Exception e) {
                response.IsError = true;
                response.ErrorMessage = "Could not save changes.";
            }
            return response;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id) {
            var family = _repository.Familys.Where(f => f.Id == id).FirstOrDefault();
            _repository.RemoveFamily(family);
            _repository.SaveChanges();
            return StatusCode(204);
        }
    }
}