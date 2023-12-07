using System;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public RoleId RoleId { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public SystemUserDTO(Guid Id, string email, RoleId roleId, string phoneNumber, string contribuinte)
        {
            Id = Id;
            Email = email;
            RoleId = roleId;
            PhoneNumber = phoneNumber;
            Contribuinte = contribuinte;
        }
        
    }
}
