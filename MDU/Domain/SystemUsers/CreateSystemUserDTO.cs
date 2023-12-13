using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsers
{
    public class CreateSystemUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public RoleId RoleId { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public CreateSystemUserDTO(string email, string password, String roleId, string phoneNumber, string contribuinte)
        {
            this.Email = email;
            this.Password = password;
            if (Guid.TryParse(roleId, out Guid roleIdGuid))
            {
                this.RoleId = new RoleId(roleIdGuid);
            }
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
