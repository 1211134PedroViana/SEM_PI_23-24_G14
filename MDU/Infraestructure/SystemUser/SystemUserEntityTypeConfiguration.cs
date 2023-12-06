using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.SystemUsers;

namespace Mpt.Infrastructure.SystemUsers
{
    internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>
    {
        public void Configure(EntityTypeBuilder<SystemUser> builder)
        {
            builder.ToTable("SystemUsers"); // Altere para o nome da tabela desejado

            builder.HasKey(b => b.Id);

            // Exemplo de configuração de outras propriedades, se aplicável
            builder.Property(b => b.Username).IsRequired().HasMaxLength(50);
            builder.Property(b => b.Password).IsRequired().HasMaxLength(100);
            // ... outras propriedades ...

            // Configuração de relacionamentos, se aplicável
            // builder.HasMany(b => b.Roles).WithMany(r => r.Users).UsingEntity(j => j.ToTable("UserRole"));
        }
    }
}
