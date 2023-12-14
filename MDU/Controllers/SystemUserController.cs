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
    public class SystemUsersController : ControllerBase
    {
        private readonly SystemUserService _service;

        public SystemUsersController(SystemUserService service)
        {
            _service = service;
        }

        // GET: api/SystemUsers
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemUserDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/SystemUsers/U1
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemUserDTO>> GetGetById(Guid id)
        {
            var user = await _service.GetByIdAsync(new SystemUserId(id));
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // GET: api/SystemUsers/searchByEmail/1210825@isep.ipp.pt
        [AllowAnonymous]
        [HttpGet("searchByEmail/{email}")]
        public async Task<ActionResult<AuthSystemUserDTO>> GetByEmail(string email)
        {
            var user = await _service.GetByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // POST: api/SystemUsers
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<SystemUserDTO>> Create(CreateSystemUserDTO dto)
        {
            try
            {
                var user = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = user.Id }, user);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}
