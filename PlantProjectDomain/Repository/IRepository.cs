using PlantProjectDomain.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PlantProjectDomain.Repository {
    public interface IRepository : IDisposable {
        IQueryable<Plant> Plants { get; }
        IQueryable<Conservation> Conservations { get; }
        IQueryable<Familia> Familias { get; }
        IQueryable<Family> Familys { get; }
        IQueryable<Phylum> Phylums { get; }

        void AddPlant(Plant item);
        void AddConservation(Conservation item);
        void AddFamilia(Familia item);
        void AddFamily(Family item);
        void AddPhylum(Phylum item);
        void SaveChanges();
    }
}
