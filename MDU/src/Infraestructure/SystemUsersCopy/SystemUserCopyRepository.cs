using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsersCopy;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.SystemUsersCopy
{
    public class SystemUserCopyRepository : BaseRepository<SystemUserCopy, SystemUserCopyId>, ISystemUserCopyRepository
    {
        public SystemUserCopyRepository(MptDbContext context):base(context.SystemUsersCopy){}

        public async Task<SystemUserCopy> GetByEmailAsync(string Email)
        {
            return await _objs.Where(u => u.Email == Email).FirstOrDefaultAsync();
        }

        public async Task<SystemUserCopy> Login(string Email)
        {
            return await _objs.Where(u => u.Email == Email).FirstOrDefaultAsync();
        }
    }
}