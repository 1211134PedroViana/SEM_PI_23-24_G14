    using System;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUser : Entity<SystemUserId>, IAggregateRoot
    {

        public string Email { get; private set; }
        public string Password { get; private set; }
        public RoleId RoleId { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Contribuinte { get; private set; }

        private SystemUser(){}

        public SystemUser(string email, string password, RoleId roleId, string phoneNumber, string contribuinte)
        {

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                throw new BusinessRuleValidationException("Email, password are required.");

            if (roleId == null)
                throw new BusinessRuleValidationException("System user requires a role.");

            this.Id = new SystemUserId(Guid.NewGuid());
            this.Email = email;
            this.Password = password; 
            this.RoleId = roleId;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
        public void ChangePassword(string newPassword)
        {
            if (string.IsNullOrWhiteSpace(newPassword))
                throw new BusinessRuleValidationException("New password cannot be empty.");
            this.Password = newPassword; 
        }
        public void ChangePhoneNumber(string newPhoneNumber)
        {
            this.PhoneNumber = newPhoneNumber;
        }
        public void ChangeContribuinte(string newContribuinte)
        {
            this.Contribuinte = newContribuinte;
        }

        public void ChangeEmail(string newEmail) 
        {
            this.Email = newEmail;
        }
    }
}
