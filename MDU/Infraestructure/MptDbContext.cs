using Microsoft.EntityFrameworkCore;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Infrastructure.SystemUsers;
using Mpt.Infrastructure.Roles;

namespace Mpt.Infrastructure
{
    public class MptDbContext : DbContext
    {
        public DbSet<SystemUser> SystemUsers { get; set; }
        public DbSet<Role> Roles { get; set; }

        public MptDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
        }
    }
}