using System;
using DDDSample1.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public int PhoneNumber { get; set; }
        public int Contribuinte { get; set; }
        
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
