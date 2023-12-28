using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mpt.Infrastructure.Shared;
using Mpt.Domain.Shared;
using Mpt.Domain.Registers;

namespace Mpt.Infrastructure.Registers
{
    public class RegisterRepository : BaseRepository<Register, RegisterId>, IRegisterRepository
    {
    
        public RegisterRepository(MptDbContext context):base(context.Registers)
        {
           
        }
    }
}