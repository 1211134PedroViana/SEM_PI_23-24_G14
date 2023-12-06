using System;

namespace Mpt.Domain.Roles
{
    public class RoleDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public RoleDTO(Guid id, string name, string description)
        {
            this.Id = Id;
            this.Name = name;
            this.Description = description;
        }
    }
}