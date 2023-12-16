
using Mpt.Domain.Roles;

namespace Mpt.Domain.Registers
{
    public class RegisterDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public RegisterDTO(Guid id, string email, string status, string phoneNumber, string contribuinte)
        {
            this.Id = id;
            this.Email = email;
            this.Status = status;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
