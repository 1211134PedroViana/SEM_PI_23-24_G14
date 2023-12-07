using System;
using Mpt.Domain.Roles;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public SystemUserDTO(Guid Id, string email, Role role, string phoneNumber, string contribuinte)
        {
            Id = Id;
            Email = email;
            Role = role;
            PhoneNumber = phoneNumber;
            Contribuinte = contribuinte;
        }
        
    }
}
