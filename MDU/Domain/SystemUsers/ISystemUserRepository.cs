using Mpt.Domain.Shared;

namespace Mpt.Domain.SystemUsers
{
    public interface ISystemUserRepository : IRepository<SystemUser, Guid>
    {
        //Task<SystemUser> GetByEmailAsync(string email);
    }
}
