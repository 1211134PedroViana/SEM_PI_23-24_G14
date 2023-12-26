using Mpt.Domain.Shared;

namespace Mpt.Domain.SystemUsersCopy
{
    public interface ISystemUserCopyRepository : IRepository<SystemUserCopy, SystemUserCopyId>
    {
        Task<SystemUserCopy> GetByEmailAsync(string email);
        
    }
}