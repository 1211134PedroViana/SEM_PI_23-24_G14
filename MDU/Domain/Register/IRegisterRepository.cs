using Mpt.Domain.Register;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Register
{
    public interface IRegisterRepo : IRepository<Register, RegisterId>
    {
        Task<Register> GetByEmailAsync(string email);
        Task<Register> Login(string Email);
    }
}
