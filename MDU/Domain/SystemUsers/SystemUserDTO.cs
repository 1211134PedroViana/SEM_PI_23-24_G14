using System;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string RoleId { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public SystemUserDTO(Guid id, string email, RoleId roleId, string phoneNumber, string contribuinte)
        {
            this.Id = id;
            this.Email = email;
            this.RoleId = roleId.AsString();
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
