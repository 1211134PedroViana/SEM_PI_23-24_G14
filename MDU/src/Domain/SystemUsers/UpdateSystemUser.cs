using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsers
{
    public class UpdateSystemUser
    {
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Guid RoleId { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public UpdateSystemUser(Guid userId, string email, string password, Guid roleId, string phoneNumber, string contribuinte)
        {
            this.UserId = userId;
            this.Email = email;
            this.Password = password;
            this.RoleId = roleId;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }


}