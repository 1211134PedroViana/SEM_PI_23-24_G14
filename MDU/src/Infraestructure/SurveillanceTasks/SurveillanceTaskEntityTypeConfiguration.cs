using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.SurveillanceTasks;

namespace Mpt.Infrastructure.SurveillanceTasks
{
    internal class SurveillanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTask>
    {
        public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
        {
            
            builder.ToTable("SurveillanceTasks");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.BuildingId).IsRequired();
            builder.Property(b => b.FloorId).IsRequired();
            builder.Property(b => b.StartPlace).IsRequired();
            builder.Property(b => b.EndPlace).IsRequired();
            builder.Property(b => b.PhoneNumber).IsRequired().HasMaxLength(9);
            builder.Property(b => b.Status).IsRequired();
            builder.Property(b => b.UserId).IsRequired();
            
        }
    }
}