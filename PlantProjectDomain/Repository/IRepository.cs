using PlantProjectDomain.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PlantProjectDomain.Repository {
    public interface IRepository : IDisposable {
        IQueryable<Plant> Plants { get; }
        IQueryable<Conservation> Conservations { get; }
        IQueryable<Family> Familys { get; }
        IQueryable<Genus> Genus { get; }

        void AddPlant(Plant item);
        void AddConservation(Conservation item);
        void AddFamily(Family item);
        void AddGenus(Genus item);
        void RemovePlant(Plant item);
        void RemoveConservation(Conservation item);
        void RemoveFamily(Family item);
        void RemoveGenus(Genus item);
        void SaveChanges();
    }
}
