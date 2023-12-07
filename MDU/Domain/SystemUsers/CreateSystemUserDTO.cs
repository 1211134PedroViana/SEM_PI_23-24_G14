using Mpt.Domain.Roles;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SystemUsers
{
    public class CreateSystemUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public CreateSystemUserDTO(string email, string password, Role role, string phoneNumber, string contribuinte)
        {
            Email = email;
            Password = password;
            Role = role;
            PhoneNumber = phoneNumber;
            Contribuinte = contribuinte;
        }
    }
}
