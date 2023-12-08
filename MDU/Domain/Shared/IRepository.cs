using System.Collections.Generic;
using System.Threading.Tasks;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.Shared
{
    public interface IRepository<TEntity, TEntityId>
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(SystemUserId id);
        Task<List<TEntity>> GetByIdsAsync(List<TEntityId> ids);
        Task<TEntity> AddAsync(TEntity obj);
        void Remove(TEntity obj);
    }
}