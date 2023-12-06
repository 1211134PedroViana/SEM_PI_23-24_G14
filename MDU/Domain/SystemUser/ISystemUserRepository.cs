using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.SystemUsers
{
    public interface ISystemUserRepository : IRepository<SystemUser, SystemUserId>
    {
        // Adicione métodos específicos do repositório, se necessário
        Task<SystemUser> GetByEmailAsync(string email);
    }
}
