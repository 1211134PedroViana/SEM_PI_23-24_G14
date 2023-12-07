/*
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using DDDSample1.Domain.SystemUsers;
/*
namespace DDDSample1.Controllers
=======
using Mpt.Domain.SystemUsers;

namespace Mpt.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private AdminService _service;

        // Corrected constructor
        public AdminController(AdminService service)
        {
            _service = service;
        }

        
        // POST : api/Admin/AcceptOrRejectUsers
        [HttpPost]
        public async Task<ActionResult<AdminDto>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        
    }
}
*/