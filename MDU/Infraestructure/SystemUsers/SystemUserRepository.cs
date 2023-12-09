using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}