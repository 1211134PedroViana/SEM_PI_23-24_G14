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
                new SystemUserDTO(user.Id, user.Email, user.Role, user. Password, user.PhoneNumber, user.Contribuinte));
        return listDto;
        }
    

        public async Task<SystemUserDTO> GetByIdAsync(SystemUserId id)
        {

            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
            {
                return null;
            }

            // Handle the case where the user is not found
            // For example, you can return null or throw an exception.
            return new SystemUserDTO(user.Id, user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }


        public async Task<SystemUserDTO> AddAsync(CreateSystemUserDTO dto)
        {
            var user = new SystemUser(dto.Email, dto.Password, dto.Role, dto.PhoneNumber, dto.Contribuinte);

            await this._repo.AddAsync(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id, user.Email, user.Password, user.Role, user.PhoneNumber, user.Contribuinte);
        }
    }
}
