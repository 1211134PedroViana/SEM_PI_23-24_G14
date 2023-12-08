using DDDSample1.Domain.SystemUsers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.SystemUsers;

namespace Mpt.Infrastructure.SystemUsers
{
    internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>
    {
        public void Configure(EntityTypeBuilder<SystemUser> builder)
        {
            builder.ToTable("SystemUsers");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Email).IsRequired().HasMaxLength(100);
            builder.Property(b => b.Password).IsRequired().HasMaxLength(100);
            builder.Property(b => b.PhoneNumber).IsRequired().HasMaxLength(9);
            builder.Property(b => b.Contribuinte).IsRequired().HasMaxLength(9);

            builder.HasOne(b => b.Role);
        }
    }

    internal interface IEntityTypeConfiguration<T>
    {
    }
}
