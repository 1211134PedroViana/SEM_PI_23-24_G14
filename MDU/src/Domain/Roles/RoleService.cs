using System.Threading.Tasks;
using System.Collections.Generic;
using Mpt.Domain.Shared;
using Mpt.Domain.Roles;

namespace Mpt.Domain.Roles
{
    public class RoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoleRepository _repo;

        public RoleService(IUnitOfWork unitOfWork, IRoleRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<RoleDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<RoleDTO> listDto = list.ConvertAll<RoleDTO>(role => 
                new RoleDTO(role.Id.AsGuid(),role.Name,role.Description));

            return listDto;
        }

        public async Task<RoleDTO> GetByIdAsync(RoleId id)
        {
            var role = await this._repo.GetByIdAsync(id);
            
            if(role == null)
                return null;

            return new RoleDTO(role.Id.AsGuid(),role.Name,role.Description);
        }

        public async Task<RoleDTO> AddAsync(CreateRoleDTO dto)
        {
            var role = new Role(dto.Name,dto.Description);

            await this._repo.AddAsync(role);

            await this._unitOfWork.CommitAsync();

            return new RoleDTO(role.Id.AsGuid(),role.Name,role.Description);
        }

        public async Task<RoleDTO> UpdateAsync(RoleDTO dto)
        {
            var role = await this._repo.GetByIdAsync(new RoleId(dto.Id)); 

            if (role == null)
                return null;   

            // change all fields
            role.ChangeName(dto.Name);
            role.ChangeDescription(dto.Description);
            
            await this._unitOfWork.CommitAsync();

            return new RoleDTO(role.Id.AsGuid(),role.Name,role.Description);
        }

        public async Task<RoleDTO> DeleteAsync(RoleId id)
        {
            var role = await this._repo.GetByIdAsync(id); 

            if (role == null)
                return null;   
            
            this._repo.Remove(role);
            await this._unitOfWork.CommitAsync();

            return new RoleDTO(role.Id.AsGuid(),role.Name,role.Description);
        }
    }
}