using Mpt.Domain.SystemUsersCopy;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.SystemUsersCopy;

namespace Mpt.Infrastructure.SystemUsersCopy
{
    internal class SystemUserCopyEntityTypeConfiguration : IEntityTypeConfiguration<SystemUserCopy>
    {
        public void Configure(EntityTypeBuilder<SystemUserCopy> builder)
        {
            builder.ToTable("SystemUsersCopy");

            builder.HasKey(b => b.Id);
            
            builder.Property(b => b.Date).IsRequired().HasMaxLength(30);
            builder.Property(b => b.Hour).IsRequired().HasMaxLength(30);
            builder.Property(b => b.Email).IsRequired().HasMaxLength(100);
            builder.Property(b => b.PhoneNumber).IsRequired(false).HasMaxLength(9);
            builder.Property(b => b.Contribuinte).IsRequired(false).HasMaxLength(9);
            builder.Property(b => b.RoleId).IsRequired();
        }
    }
}