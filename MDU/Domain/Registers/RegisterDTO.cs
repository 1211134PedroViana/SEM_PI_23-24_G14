
using Mpt.Domain.Roles;

namespace Mpt.Domain.Registers
{
    public class RegisterDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string RoleId { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public RegisterDTO(Guid id, string email, RoleId roleId, string phoneNumber, string contribuinte)
        {
            this.Id = id;
            this.Email = email;
            this.RoleId = roleId.AsString();
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
