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

        public CreateSystemUserDTO(string email, string password, string roleId, string phoneNumber, string contribuinte)
        {
            Email = email;
            Password = password;
            if (Guid.TryParse(roleId, out Guid roleIdGuid))
            {
                RoleId = new RoleId(roleIdGuid);
            }
            PhoneNumber = phoneNumber;
            Contribuinte = contribuinte;
        }
    }
}
