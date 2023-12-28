using Mpt.Domain.Shared;

namespace Mpt.Domain.SystemUsers
{
    public interface ISystemUserRepository : IRepository<SystemUser, SystemUserId>
    {
        Task<SystemUser> GetByEmailAsync(string email);
        Task<SystemUser> Login(string Email);
        //Task<SystemUser> Update(SystemUser systemUser);
    }
}
