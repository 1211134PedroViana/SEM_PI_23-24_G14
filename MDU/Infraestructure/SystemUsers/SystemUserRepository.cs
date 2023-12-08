using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.SystemUsers
{
    public class SystemUserRepository : BaseRepository<SystemUser, SystemUserId>, ISystemUserRepository
    {
        public SystemUserRepository(DbSet<SystemUser> objs) : base(objs)
        {
        }

        public async Task<List<SystemUser>> GetByIdsAsync(List<Guid> ids)
        {
            return await _objs.Where(user => ids.Contains(user.Id)).ToListAsync();
        }
    }
}