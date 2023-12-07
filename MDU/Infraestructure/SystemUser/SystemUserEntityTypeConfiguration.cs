using DDDSample1.Domain.SystemUsers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mpt.Infrastructure.SystemUsers
{
    internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>
    {
        public void Configure(EntityTypeBuilder<SystemUser> builder)
        {
            builder.ToTable("SystemUsers"); // Altere para o nome da tabela desejado

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Email).IsRequired().HasMaxLength(100);
            builder.Property(b => b.Password).IsRequired().HasMaxLength(100);
            builder.Property(b => b.Role).IsRequired().HasMaxLength(50);

            // Adicionando as novas propriedades
            builder.Property(b => b.PhoneNumber).IsRequired().HasMaxLength(9);
            builder.Property(b => b.Contribuinte).IsRequired().HasMaxLength(9);

            // Configuração de relacionamentos, se aplicável
            // builder.HasMany(b => b.Roles).WithMany(r => r.Users).UsingEntity(j => j.ToTable("UserRole"));
        }
    }

    internal interface IEntityTypeConfiguration<T>
    {
    }
}
