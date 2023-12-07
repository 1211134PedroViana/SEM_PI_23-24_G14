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

        public SystemUserRepository(MptDbContext context):base(context.SystemUsers)
        {
           
        }

        
    }
}