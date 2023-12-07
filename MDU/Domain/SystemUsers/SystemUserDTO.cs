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

        public SystemUserDTO(Guid id, string email, string password, string role, int phoneNumber, int contribuinte)
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
        
        public static SystemUserDTO FromDomain(SystemUser user)
        {
            // Assuming SystemUserId has a property named Value of type Guid
            return new SystemUserDTO(
                id: user.Id.Value, // Adjust this line based on your actual property in SystemUserId
                email: user.Email,
                password: user.Password,
                role: user.Role,
                phoneNumber: user.PhoneNumber,
                contribuinte: user.Contribuinte
            );
        }
    }
}
