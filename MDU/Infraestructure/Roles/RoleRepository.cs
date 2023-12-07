using Mpt.Domain.Roles;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>, IRoleRepository
    {
    
        public RoleRepository(MptDbContext context):base(context.Roles)
        {
           
        }


    }
}