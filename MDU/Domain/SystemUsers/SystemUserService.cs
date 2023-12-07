using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.SystemUsers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _repo;
        
        public SystemUserService(IUnitOfWork unitOfWork, ISystemUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<SystemUserDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<SystemUserDTO> listDto = list.ConvertAll<SystemUserDTO>(user =>
                new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.PhoneNumber, user.Contribuinte));
                
            return listDto;
        }

        public async Task<SystemUserDTO> GetByIdAsync(SystemUserId id)
        {

            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
            {
                return null;
            }

            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> AddAsync(CreateSystemUserDTO dto)
        {
            var user = new SystemUser(dto.Email, dto.Password, dto.Role, dto.PhoneNumber, dto.Contribuinte);

            await this._repo.AddAsync(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> UpdateAsync(SystemUserDTO dto)
        {
            var user = await _repo.GetByIdAsync(new SystemUserId(dto.Id));

            if (user == null)
                return null;

            // change all fields
            user.ChangePhoneNumber(dto.PhoneNumber);
            user.ChangeContribuinte(dto.Contribuinte);

            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> InactivateAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id); 

            if (user == null)
                return null;   

            // change all fields
            user.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> DeactivateAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
                return null;

            user.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.Value, user.Email, user.Password, user.Role, user.PhoneNumber, user.Contribuinte);
            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> DeleteAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
                return null;

            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.AsGuid(), user.Email, user.Role, user.PhoneNumber, user.Contribuinte);
        }
    }
}
