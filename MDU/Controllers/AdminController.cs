/*
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private AdminService _service;
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