using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.SystemUsers;
using Mpt.Domain.Roles;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mpt.Domain.Register;

namespace Mpt.Domain.SystemUsers
{
    public class RegisterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRegisterRepo _repo;
        private readonly IRoleRepository _roleRepo;
        
        public RegisterService(IUnitOfWork unitOfWork, IRegisterRepo repo, IRoleRepository roleRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._roleRepo = roleRepo;
        }

        public async Task<List<RegisterDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            List<RegisterDTO> listDto = list.ConvertAll<RegisterDTO>(user =>
                new RegisterDTO(user.Id.AsGuid(), user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte));
                
            return listDto;
        }

        public async Task<RegisterDTO> GetByIdAsync(RegisterId id)
        {
            var user = await this._repo.GetByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            return new RegisterDTO(user.Id.AsGuid(), user.Email, user.RoleId, user.PhoneNumber, user.Contribuinte);
        }
        
        public async Task<RegisterDTO> AddAsync(CreateRegisterDTO dto)
        {
            await checkRoleIdAsync(dto.RoleId);
            var register = new Register.Register(dto.Email, dto.Password, dto.RoleId, dto.PhoneNumber, dto.Contribuinte);
            await this._repo.AddAsync(register);
            await this._unitOfWork.CommitAsync();
            return new RegisterDTO(register.Id.AsGuid(), register.Email, register.RoleId, register.PhoneNumber, register.Contribuinte);
        }
        

        private async Task checkRoleIdAsync(RoleId roleId)
        {
           var role = await _roleRepo.GetByIdAsync(roleId);
           if (role == null)
                throw new BusinessRuleValidationException("Invalid Role Id.");
        }
    }
}
