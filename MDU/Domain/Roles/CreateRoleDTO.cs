using Mpt.Domain.Roles;

namespace Mpt.Domain.Roles
{
    public class CreateRoleDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public CreateRoleDTO(string name, string description)
        {
            this.Name = name;
            this.Description = description;
            
        }
    }
}