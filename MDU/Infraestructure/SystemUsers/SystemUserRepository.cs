using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mpt.Domain.Shared;
using DDDSample1.Domain.SystemUsers;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.SystemUsers
{
    public class SystemUserRepository : BaseRepository<SystemUser, Guid>, ISystemUserRepository
    {
    public SystemUserRepository(DbSet<SystemUser> objs) : base(objs)
    {
    }
        Task<object> ISystemUserRepository.GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
