using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace Mpt.Infrastructure.SystemUsers
{
    public class SystemUserRepository : BaseRepository<SystemUser, SystemUserId>, ISystemUserRepository
    {
        
        public async Task<SystemUser> GetByIdAsync(string id)
        {
            if (Guid.TryParse(id, out Guid userId))
            {
                SystemUserId entityId = new SystemUserId(userId);
                return await GetByIdAsync(entityId);
            }

            // Handle the case where the parsing fails or the user is not found
            // For example, you can return null or throw an exception.
            return null;
        }
        
        
        // Implementation for Task<object> GetByIdAsync(Guid id)
        public async Task<object> GetByIdAsync(Guid id)
        {
            // Implement the logic to get the user by Guid, if needed
            // This is a placeholder; you need to implement it according to your requirements
            throw new NotImplementedException();
        }

        public SystemUserRepository(DbSet<SystemUser> objs) : base(objs)
        {
            //Task<SystemUser> GetByEmailAsync(string email);
        }
    }
}