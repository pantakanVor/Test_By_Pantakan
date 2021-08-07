using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using API.Model;
using System.IO;
using Newtonsoft.Json;

namespace API
{
    public interface IPersonService
    {
        List<PersonModel> Get();
        bool Add(PersonModel model);
        bool Update(PersonModel model);
        bool Delete(string id);
    }

    public class PersonService : IPersonService
    {

        public PersonService()
        {
        }
        public List<PersonModel> Get()
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "Data/data.js");
            if (!System.IO.File.Exists(fullPath))
            {
                return new List<PersonModel>();
            }
            var json = System.IO.File.ReadAllText(fullPath);
            List<PersonModel> perLs = JsonConvert.DeserializeObject<List<PersonModel>>(json);
            return perLs;
        }
        public bool Add(PersonModel model)
        {
            List<PersonModel> perLs = new List<PersonModel>();
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "Data/data.js");
            if (System.IO.File.Exists(fullPath))
            {
                var json = System.IO.File.ReadAllText(fullPath);
                perLs = JsonConvert.DeserializeObject<List<PersonModel>>(json);
            }
            perLs.Add(model);
            string str = JsonConvert.SerializeObject(perLs);
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            System.IO.File.WriteAllText(fullPath, str);
            return true;
        }
        public bool Update(PersonModel model)
        {
            List<PersonModel> perLs = new List<PersonModel>();
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "Data/data.js");
            if (System.IO.File.Exists(fullPath))
            {
                var json = System.IO.File.ReadAllText(fullPath);
                perLs = JsonConvert.DeserializeObject<List<PersonModel>>(json);
            }
            foreach (PersonModel item in perLs)
            {
                if (item.IdCard == model.IdCard)
                {
                    item.Firstname = model.Firstname;
                    item.Lastname = model.Lastname;
                }
            }
            string str = JsonConvert.SerializeObject(perLs);
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            System.IO.File.WriteAllText(fullPath, str);
            return true;
        }

        public bool Delete(string id)
        {
            List<PersonModel> perLs = new List<PersonModel>();
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "Data/data.js");
            if (System.IO.File.Exists(fullPath))
            {
                var json = System.IO.File.ReadAllText(fullPath);
                perLs = JsonConvert.DeserializeObject<List<PersonModel>>(json);
            }
            foreach (PersonModel item in perLs)
            {
                if (item.IdCard == id.ToString())
                {
                    perLs.Remove(item);
                    break;
                }
            }
            string str = JsonConvert.SerializeObject(perLs);
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            System.IO.File.WriteAllText(fullPath, str);
            return true;
        }

    }
}