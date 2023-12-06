using System;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public SystemUserDTO(Guid id, string email, string password, string role)
        {
            Id = id;
            Email = email;
            Password = password;
            Role = role;
        }
    }
}
