using System;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Roles
{
    public class Role : Entity<RoleId>, IAggregateRoot
    {
        public string Name { get; private set; }
        public string Description { get; private set; }

        private Role()
        {
            // Construtor privado para uso do Entity Framework ou mecanismos de persistência semântica semelhantes
        }

        public Role(string name, string description)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(description))
                throw new BusinessRuleValidationException("Name and Description are required.");

            this.Id = new RoleId(Guid.NewGuid());
            this.Name = name;
            this.Description = description; 
          
        }

        public void ChangeName(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
                throw new BusinessRuleValidationException("New name cannot be empty.");

            this.Name = newName;
        }

        public void ChangeDescription(string newDescription)
        {
            // Lógica para validação, se necessário
            this.Description = newDescription;
        }

    }
}