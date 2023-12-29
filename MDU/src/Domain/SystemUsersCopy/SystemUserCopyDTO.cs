using System;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsersCopy;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsersCopy
{
    public class SystemUserCopyDTO 
    {

        public Guid Id { get; set; }
        public string Date { get; private set; }
        public string Hour { get; private set; }
        public string Email { get; private set; }
        public RoleId RoleId { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Contribuinte { get; private set; }   

        public SystemUserCopyDTO(Guid id, string date, string hour, string email, RoleId roleId, string phoneNumber, string contribuinte) 
        {
            this.Id = id;
            this.Date = date;
            this.Hour = hour;
            this.Email = email;
            this.RoleId = roleId;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}