using System;
using System.Collections.Generic;
using System.Text;

namespace PlantProjectDomain.Domain {
    public class Plant {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LatinName { get; set; }
        public Genus Genus { get; set; }//perekond
        public Family Family { get; set; }//sugukond
        public Conservation Conservation { get; set; }//kaitsmine
    }
}
