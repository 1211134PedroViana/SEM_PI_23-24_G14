using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.SystemUsers
{
    public class SystemUserRepository : BaseRepository<SystemUser, SystemUserId>, ISystemUserRepository
    {
        public SystemUserRepository(MptDbContext context) : base(context.SystemUsers)
        {

        }
    }
}
