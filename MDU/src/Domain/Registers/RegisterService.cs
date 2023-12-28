using Mpt.Domain.Shared;

namespace Mpt.Domain.Registers
{
    public class RegisterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRegisterRepository _repo;
        
        public RegisterService(IUnitOfWork unitOfWork, IRegisterRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<RegisterDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            List<RegisterDTO> listDto = list.ConvertAll<RegisterDTO>(register =>
                new RegisterDTO(register.Id.AsGuid(), register.Email, register.Status, register.PhoneNumber, register.Contribuinte));
                
            return listDto;
        }

        public async Task<RegisterDTO> GetByIdAsync(RegisterId id)
        {
            var register = await this._repo.GetByIdAsync(id);
            if (register == null)
            {
                return null;
            }
            return new RegisterDTO(register.Id.AsGuid(), register.Email, register.Status, register.PhoneNumber, register.Contribuinte);
        }
        
        public async Task<RegisterDTO> AddAsync(CreateRegisterDTO dto)
        {
            var register = new Register(dto.Email, dto.Password, dto.PhoneNumber, dto.Contribuinte);
            await this._repo.AddAsync(register);
            await this._unitOfWork.CommitAsync();
            return new RegisterDTO(register.Id.AsGuid(), register.Email, register.Status, register.PhoneNumber, register.Contribuinte);
        }
    
    }
}
