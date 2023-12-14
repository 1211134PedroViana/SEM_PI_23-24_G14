using System;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsers
{
    public class AuthSystemUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public AuthSystemUserDTO(string email, string password)
        {
            this.Email = email;
            this.Password = password;
        }
    }
}