using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.SystemUsers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _repo;
        private readonly SystemUserRepository _userRepository;
        
        public SystemUserService(SystemUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<SystemUserDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<SystemUserDTO> listDto = list.ConvertAll<SystemUserDTO>(user =>
                new SystemUserDTO(user.Id, user.Email, user.Role, user. Password, user.PhoneNumber, user.Contribuinte));
        return listDto;
        }
        
        public async Task<SystemUserDTO> GetByIdAsync(Guid id)
        {
            Guid entityId = id;

            SystemUser user = await _userRepository.GetByIdAsync(entityId);

            if (user != null)
            {
                return SystemUserDTO.FromDomain(user);
            }

            // Handle the case where the user is not found
            // For example, you can return null or throw an exception.
            return null;
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
