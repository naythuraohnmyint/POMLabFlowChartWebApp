using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using POMDBBLL.model;

namespace POMDBBLL.util
{
    public class UtilController
    {
        public List<string> MaterialNameList()
        {
            List<string> list = new List<string>();
            
            /* Recommended Version
            using (SqlConnection SqlConn = new SqlConnection(DBConstant.dbConnection))
            {
                SqlCommand sqlCmd = new SqlCommand("SELECT name FROM [MaterialTbl]", SqlConn);
                DataSet ds = new DataSet();
                using (SqlDataAdapter da = new SqlDataAdapter(sqlCmd))
                {
                    da.Fill(ds, "MaterialTbl");
                }

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    list.Add(row["name"].ToString());
                }

                 return list.ToArray<string>();
            }
            */

            /* Old Version */

            SqlConnection conn = new SqlConnection(DBConstant.dbConnection);
            SqlDataAdapter adapter = new SqlDataAdapter
               ("SELECT name FROM [MaterialTbl]", conn);
            DataTable table = new DataTable();
            adapter.Fill(table);
            foreach (DataRow r in table.Rows)
                list.Add((string)r["name"]);
            conn.Close();
            return list;
            
        }

        public List<string> density_g_mLByMaterialName(string name)
        {
            List<string> list = new List<string>();
            SqlConnection conn = new SqlConnection(DBConstant.dbConnection);
            SqlDataAdapter adapter = new SqlDataAdapter
               (String.Format(@"SELECT [density_g/mL] FROM [MaterialTbl] WHERE name = '{0}'", name), conn);
            DataTable table = new DataTable();
            adapter.Fill(table);
            foreach (DataRow r in table.Rows)
                list.Add(Convert.ToString(r["density_g/mL"]));
            conn.Close();
            return list;
        }


        public List<string> colourcodeByMaterialName(string name)
        {
            List<string> list = new List<string>();
            SqlConnection conn = new SqlConnection(DBConstant.dbConnection);
            SqlDataAdapter adapter = new SqlDataAdapter
               (String.Format(@"SELECT [colourcode] FROM [MaterialTbl] WHERE name = '{0}'", name), conn);
            DataTable table = new DataTable();
            adapter.Fill(table);
            foreach (DataRow r in table.Rows)
                list.Add(Convert.ToString(r["colourcode"]));
            conn.Close();
            return list;
        }

        public List<Material> getAllMaterialList()
        {
            List<Material> listMaterial = new List<Material>();
            Material m;
            SqlConnection conn = new SqlConnection(DBConstant.dbConnection);
            SqlDataAdapter adapter = new SqlDataAdapter
               (String.Format(@"SELECT * FROM [MaterialTbl]"), conn);
            DataTable table = new DataTable();
            adapter.Fill(table);
            
            foreach (DataRow r in table.Rows)
            {
                m = new Material();
                m.Id = Convert.ToInt32(r["id"]);
                m.Name = Convert.ToString(r["name"]);
                m.Density_g_mL = Convert.ToString(r["density_g/mL"]);
                m.Colourcode = Convert.ToString(r["colourcode"]);
                listMaterial.Add(m);
            }
            
            conn.Close();
            return listMaterial;
        }
    }
}
