using Mpt.Domain.Shared;

namespace Mpt.Domain.SystemUsers
{
    public interface ISystemUserRepository : IRepository<SystemUser, SystemUserId>
    {
        // Adicione métodos específicos do repositório, se necessário
        //Task<SystemUser> GetByEmailAsync(string email);
    }
}
