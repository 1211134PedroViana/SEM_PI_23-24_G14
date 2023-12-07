using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.SystemUsers;

namespace DDDSample1.Domain.SystemUsers
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
                new SystemUserDTO(user.Id.Value, user.Email, user.Role, user. Password, user.PhoneNumber, user.Contribuinte));
        return listDto;
        }
        
        public async Task<SystemUserDTO> GetByIdAsync(Guid id)
        {
            SystemUserId entityId = new SystemUserId(id);

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

            return new SystemUserDTO(user.Id.Value, user.Email, user.Password, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> UpdateAsync(SystemUserDTO dto)
        {
            var user = await _repo.GetByIdAsync(new SystemUserId(dto.Id));

            if (user == null)
                return null;

            // change all fields
            user.ChangePassword(dto.Password);
            user.ChangePhoneNumber(dto.PhoneNumber);
            user.ChangeContribuinte(dto.Contribuinte);

            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.Value, user.Email, user.Password, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> DeactivateAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
                return null;

            user.Deactivate();

            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.Value, user.Email, user.Password, user.Role, user.PhoneNumber, user.Contribuinte);
        }

        public async Task<SystemUserDTO> DeleteAsync(SystemUserId id)
        {
            var user = await this._repo.GetByIdAsync(id);

            if (user == null)
                return null;

            this._repo.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDTO(user.Id.Value, user.Email, user.Password, user.Role, user.PhoneNumber, user.Contribuinte);
        }
    }
}
