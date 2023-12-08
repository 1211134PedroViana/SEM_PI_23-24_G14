using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.PickupAndDeliveryTasks;

namespace Mpt.Infrastructure.PickupAndDeliveryTasks
{
    internal class PickupAndDeliveryTaskEntityTypeConfiguration : IEntityTypeConfiguration<PickupAndDeliveryTask>
    {
        public void Configure(EntityTypeBuilder<PickupAndDeliveryTask> builder)
        {
            
            builder.ToTable("PickupAndDeliveryTasks");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.PickupPlace).IsRequired();
            builder.Property(b => b.DeliveryPlace).IsRequired();
            builder.Property(b => b.PickupPersonName).IsRequired().HasMaxLength(30);
            builder.Property(b => b.PickupPersonPhoneNumber).IsRequired().HasMaxLength(9);
            builder.Property(b => b.DeliveryPersonName).IsRequired().HasMaxLength(30);
            builder.Property(b => b.DeliveryPersonPhoneNumber).IsRequired().HasMaxLength(9);
            builder.Property(b => b.Description).IsRequired().HasMaxLength(1000);
            builder.Property(b => b.ConfirmationCode).IsRequired();
            builder.Property(b => b.Status).IsRequired();
            builder.Property(b => b.UserId).IsRequired();
        }
    }
}