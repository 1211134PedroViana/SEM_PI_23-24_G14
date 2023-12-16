using Mpt.Domain.Roles;

namespace Mpt.Domain.Registers
{
    public class CreateRegisterDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public CreateRegisterDTO(string email, string password, String status, string phoneNumber, string contribuinte)
        {
            this.Email = email;
            this.Password = password;
            this.Status = status;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
