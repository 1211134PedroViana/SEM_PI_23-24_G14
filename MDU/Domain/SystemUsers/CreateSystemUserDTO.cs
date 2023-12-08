using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

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
            this.Email = email;
            this.Password = password;
            this.Role = role;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
