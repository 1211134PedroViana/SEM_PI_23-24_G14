using System;
using Mpt.Domain.Shared;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUser : Entity<SystemUserId>, IAggregateRoot
    {
        public string Email { get; private set; }
        public string Password { get; private set; }
        public string Role { get; private set; }
        public bool Active { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Contribuinte { get; private set; }

        private SystemUser()
        {
            // Construtor privado para uso do Entity Framework ou mecanismos de persistência semântica semelhantes
        }

        public SystemUser(string email, string password, string role, string phoneNumber, string contribuinte)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(role))
                throw new BusinessRuleValidationException("Email, password, and role are required.");

            this.Id = new SystemUserId(Guid.NewGuid());
            this.Email = email;
            this.Password = password; // Recomenda-se utilizar técnicas seguras para armazenamento de senhas na prática
            this.Role = role;
            this.Active = true;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }

        public void ChangePassword(string newPassword)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the password for an inactive user.");

            if (string.IsNullOrWhiteSpace(newPassword))
                throw new BusinessRuleValidationException("New password cannot be empty.");

            this.Password = newPassword; // Recomenda-se utilizar técnicas seguras para armazenamento de senhas na prática
        }

        public void ChangePhoneNumber(string newPhoneNumber)
        {
            // Lógica para validação, se necessário
            this.PhoneNumber = newPhoneNumber;
        }

        public void ChangeContribuinte(string newContribuinte)
        {
            // Lógica para validação, se necessário
            this.Contribuinte = newContribuinte;
        }

        public void Deactivate()
        {
            this.Active = false;
        }
    }
}
