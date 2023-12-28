using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Registers;

namespace Mpt.Infrastructure.Registers
{
    internal class RegisterEntityTypeConfiguration : IEntityTypeConfiguration<Register>
    {
        public void Configure(EntityTypeBuilder<Register> builder)
        {
            
            builder.ToTable("Registers");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Email).IsRequired();
            builder.Property(b => b.Password).IsRequired();
            builder.Property(b => b.PhoneNumber).IsRequired().HasMaxLength(9);
            builder.Property(b => b.Contribuinte).IsRequired().HasMaxLength(9);
            builder.Property(b => b.Status).IsRequired();
        }
    }
}