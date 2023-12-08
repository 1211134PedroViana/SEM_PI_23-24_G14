using Mpt.Domain.Roles;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SystemUsers
{
    public class CreateSystemUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public int PhoneNumber { get; set; }
        public int Contribuinte { get; set; }

        public CreateSystemUserDTO(string email, string password, string role, int phoneNumber, int contribuinte)
        {
            Email = email;
            Password = password;
            Role = role;
            PhoneNumber = phoneNumber;
            Contribuinte = contribuinte;
        }
    }
}
