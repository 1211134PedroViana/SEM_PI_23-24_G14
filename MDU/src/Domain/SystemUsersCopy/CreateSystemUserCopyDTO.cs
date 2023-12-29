using Mpt.Domain.SystemUsersCopy;
using Mpt.Domain.Roles;

namespace Mpt.Domain.SystemUsersCopy
{
    public class CreateSystemUserCopyDTO
    {   
        public string Date { get; set; }

        public string Hour { get; set; }
        public string Email { get; set; }
        public RoleId RoleId { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public CreateSystemUserCopyDTO(string date, string hour, string email, String roleId, string phoneNumber, string contribuinte)
        {
            this.Date = date;
            this.Hour = hour;
            this.Email = email;
            if (Guid.TryParse(roleId, out Guid roleIdGuid))
            {
                this.RoleId = new RoleId(roleIdGuid);
            }
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}