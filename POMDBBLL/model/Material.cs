using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POMDBBLL.model
{
    public class Material
    {
        #region
        int id;
        string name;
        string density_g_mL;
        string colourcode;
        #endregion

        public int Id
        {
            get { return id; }
            set { id = value;  }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string Density_g_mL
        {
            get { return density_g_mL; }
            set { density_g_mL = value; }
        }

        public string Colourcode
        {
             get { return colourcode; }
            set { colourcode = value; }
        }

        public Material()
        { }

        public Material(int id, string name, string density_g_mL, string colourcode)
        {
            this.id = id;
            this.name = name;
            this.density_g_mL = density_g_mL;
            this.colourcode = colourcode;
        }

        public override string ToString()
        {
            return "Id: "+id+ " Name: "+name+" d1000/kgm3: "+ density_g_mL + " Lbft3: "+ colourcode;
        }
    }
}

