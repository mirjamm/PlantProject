using System;
using System.Collections.Generic;
using System.Text;

namespace PlantProjectDomain.Domain {
    public class Plant {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LatinName { get; set; }
        public Phylum Phylum { get; set; }//hoimkond
        public Familia Familia { get; set; }//sugukond
        public Family Family { get; set; }//perekond
        public Conservation Conservation { get; set; }//kaitsmine
    }
}
