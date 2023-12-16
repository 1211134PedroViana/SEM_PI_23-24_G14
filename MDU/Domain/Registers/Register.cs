using Mpt.Domain.Shared;
using Mpt.Domain.Roles;

namespace Mpt.Domain.Registers
{
    public class Register : Entity<RegisterId>, IAggregateRoot
    {

        public string Email { get; private set; }
        public string Password { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Contribuinte { get; private set; }
        public TasksStatus Status { get; private set; }

        private Register(){}

        public Register(string email, string password, string phoneNumber, string contribuinte)
        {

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                throw new BusinessRuleValidationException("Email, password are required.");

            this.Id = new RegisterId(Guid.NewGuid());
            this.Email = email;
            this.Password = password; 
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
            this.Status = TasksStatus.Pending;
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
    }
}
