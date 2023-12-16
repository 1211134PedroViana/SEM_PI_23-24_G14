using Microsoft.EntityFrameworkCore;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.Registers;
using Mpt.Infrastructure.SystemUsers;
using Mpt.Infrastructure.Roles;
using Mpt.Infrastructure.SurveillanceTasks;
using Mpt.Infrastructure.PickupAndDeliveryTasks;
using Mpt.Infrastructure.Registers;

namespace Mpt.Infrastructure
{
    public class MptDbContext : DbContext
    {
        public DbSet<SystemUser> SystemUsers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<SurveillanceTask> SurveillanceTasks { get; set; }
        public DbSet<PickupAndDeliveryTask> PickupAndDeliveryTasks { get; set; }
        public DbSet<Register> Registers { get; set; }

        public MptDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SurveillanceTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PickupAndDeliveryTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RegisterEntityTypeConfiguration());
        }
    }
}