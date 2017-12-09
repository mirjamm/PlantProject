using PlantProjectDomain.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PlantProjectDomain.Repository {
    public class RepositoryContext : DbContext, IRepository {

        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options) {
        }

        public DbSet<Plant> Plants { get; set; }
        public DbSet<Conservation> Conservations { get; set; }
        public DbSet<Family> Familys { get; set; }
        public DbSet<Genus> Genus { get; set; }

        IQueryable<Plant> IRepository.Plants {
            get { return Plants; }
        }

        IQueryable<Conservation> IRepository.Conservations {
            get { return Conservations; }
        }

        IQueryable<Genus> IRepository.Genus {
            get { return Genus; }
        }

        IQueryable<Family> IRepository.Familys {
            get { return Familys; }
        }

        public void AddPlant(Plant item) {

        }

        public void AddConservation(Conservation item) {
            Conservations.Add(item);
        }

        public void AddGenus(Genus item) {
            throw new NotImplementedException();
        }

        public void AddFamily(Family item) {
            throw new NotImplementedException();
        }

        public new void SaveChanges() {
            base.SaveChanges();
        }
    }
}
