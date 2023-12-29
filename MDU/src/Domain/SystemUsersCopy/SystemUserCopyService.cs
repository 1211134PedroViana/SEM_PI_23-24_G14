using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsersCopy;
using Mpt.Infrastructure.SystemUsersCopy;
using Mpt.Domain.Roles;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Mpt.Domain.SystemUsersCopy
{
    public class SystemUserCopyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserCopyRepository _repo;
        private readonly IRoleRepository _roleRepo;

        public SystemUserCopyService(IUnitOfWork unitOfWork, ISystemUserCopyRepository repo, IRoleRepository roleRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._roleRepo = roleRepo;
        }
        public async Task<List<SystemUserCopyDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            List<SystemUserCopyDTO> listDto = list.ConvertAll<SystemUserCopyDTO>(user =>
                new SystemUserCopyDTO(user.Id.AsGuid(), user.Date, user.Hour, user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte));

            return listDto;
        }

        public async Task<SystemUserCopyDTO> GetByIdAsync(SystemUserCopyId id)
        {
            var user = await this._repo.GetByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            return new SystemUserCopyDTO(user.Id.AsGuid(), user.Date, user.Hour, user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserCopyDTO> ByEmailAsync(string email)
        {
            var user = await this._repo.GetByEmailAsync(email);
            if (user == null)
            {
                return null;
            }
            return new SystemUserCopyDTO(user.Id.AsGuid(), user.Date, user.Hour, user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }


        public async Task<SystemUserCopyDTO> AddAsync(CreateSystemUserCopyDTO dto)
        {
            //await checkRoleIdAsync(dto.RoleId);
            var user = new SystemUserCopy(dto.Date, dto.Hour, dto.Email, dto.RoleId, dto.PhoneNumber, dto.Contribuinte);
            await this._repo.AddAsync(user);
            await this._unitOfWork.CommitAsync();
            return new SystemUserCopyDTO(user.Id.AsGuid(), user.Date, user.Hour, user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserCopyDTO> DeleteAsync(SystemUserCopyId id)
        {
            var user = await this._repo.GetByIdAsync(id);
            if (user == null)
                return null;
            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();
            return new SystemUserCopyDTO(user.Id.AsGuid(), user.Date, user.Hour, user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }

        private async Task checkRoleIdAsync(RoleId roleId)
        {
            var role = await _roleRepo.GetByIdAsync(roleId);
            if (role == null)
            {
                throw new BusinessRuleValidationException("Invalid Role Id.");
            }
        }


    }
}