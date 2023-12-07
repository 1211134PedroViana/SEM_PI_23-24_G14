using System;
using Mpt.Domain.Roles;

namespace Mpt.Domain.Roles
{
    public class RoleDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public RoleDTO(Guid Id, string name, string description)
        {
            this.Id = Id;
            this.Name = name;
            this.Description = description;
        }
    }
}