using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace API.Model
{
  
    public class PersonModel
    {
        public string IdCard { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}
