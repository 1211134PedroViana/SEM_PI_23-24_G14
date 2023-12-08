using System;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

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

        public SystemUserDTO(Guid id, string email, string password, string role, int phoneNumber, int contribuinte)
        {
            Id = id;
            Email = email;
            Role = role;
            PhoneNumber = phoneNumber;
            Contribuinte = contribuinte;
        }
        
        public static SystemUserDTO FromDomain(SystemUser user)
        {
            // Assuming SystemUserId has a property named Value of type Guid
            return new SystemUserDTO(
                id: user.Id,
                email: user.Email,
                password: user.Password,
                role: user.Role,
                phoneNumber: user.PhoneNumber,
                contribuinte: user.Contribuinte
            );
        }
        public SystemUserDTO(Guid Id, string email, string role, int phoneNumber, int contribuinte)
        {
            this.Id = Id;
            this.Email = email;
            this.Role = role;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    
    }
}
