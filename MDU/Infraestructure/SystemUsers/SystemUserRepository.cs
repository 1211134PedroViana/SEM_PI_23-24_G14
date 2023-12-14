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
        public SystemUserRepository(MptDbContext context):base(context.SystemUsers)
        {
        }

        public async Task<SystemUser> GetByEmailAsync(string Email)
        {
            return await _objs.Where(u => u.Email == Email).FirstOrDefaultAsync();
        }

        public async Task<SystemUser> Login(string Email)
        {
            return await _objs.Where(u => u.Email == Email).FirstOrDefaultAsync();
        }
    }
}