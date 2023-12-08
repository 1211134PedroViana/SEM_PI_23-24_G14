using System;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUser : Entity<SystemUserId>, IAggregateRoot
    {
        public Guid Id { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public string Role { get; private set; }
        public string RoleId { get; private set; }
        public int PhoneNumber { get; private set; }
        public int Contribuinte { get; private set; }

        private SystemUser()
        {
            // Construtor privado para uso do Entity Framework ou mecanismos de persistência semântica semelhantes
        }

        public SystemUser(string email, string password, string role, int phoneNumber, int contribuinte)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password) )
                throw new BusinessRuleValidationException("Email, password, and role are required.");
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password) )
                throw new BusinessRuleValidationException("Email, password are required.");

            if (role== null)
                throw new BusinessRuleValidationException("System user requires a role.");

            this.Id = Guid.NewGuid();
            this.Email = email;
            this.Password = password;
            this.RoleId = role;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
