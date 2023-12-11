using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.SystemUsers;
using Mpt.Domain.Roles;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _repo;
        private readonly IRoleRepository _roleRepo;
        
        public SystemUserService(IUnitOfWork unitOfWork, ISystemUserRepository repo, IRoleRepository roleRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._roleRepo = roleRepo;
        }

        public async Task<List<SystemUserDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            List<SystemUserDTO> listDto = list.ConvertAll<SystemUserDTO>(user =>
                new SystemUserDTO(user.Id.AsGuid(), user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte));
                
            return listDto;
        }

        public async Task<SystemUserDTO> GetByIdAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> AddAsync(CreateSystemUserDTO dto)
        {
            await checkRoleIdAsync(dto.RoleId);
            var user = new SystemUser(dto.Email, dto.Password, dto.RoleId, dto.PhoneNumber, dto.Contribuinte);
            await this._repo.AddAsync(user);
            await this._unitOfWork.CommitAsync();
            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> DeleteAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);
            if (user == null)
                return null;
            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();
            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }

        private async Task checkRoleIdAsync(RoleId roleId)
        {
           var role = await _roleRepo.GetByIdAsync(roleId);
           if (role == null)
                throw new BusinessRuleValidationException("Invalid Role Id.");
        }
    }
}
