 using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using API.Model;
using System.IO;
using Newtonsoft.Json;

namespace  API
{
    public interface IUserService
    {
        AuthenRes Authenticate(AuthenReq model);
        User getUser(int id);
    }

    public class UserService : IUserService
    {
        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public UserService(
            IJwtUtils jwtUtils,
            IMapper mapper)
        {
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public AuthenRes Authenticate(AuthenReq model)
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "Data/User.js");
            var json = System.IO.File.ReadAllText(fullPath);
            var user = JsonConvert.DeserializeObject<List<User>>(json)[0];


            if (user.UserName != model.Username && user.Password != model.Password)
                throw new AppException("Username or password is incorrect");

            var response = new AuthenRes();
            response.Id = user.Id;
            response.Username = user.UserName;
            response.FirstName = user.FirstName;
            response.LastName = user.LastName;
            response.JwtToken = _jwtUtils.GenerateToken(user);
            return response;
        }

        public User getUser(int id)
        {
            var user = new User();
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}