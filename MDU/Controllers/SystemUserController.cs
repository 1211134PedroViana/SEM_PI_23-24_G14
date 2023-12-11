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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemUserDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/SystemUsers/U1
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

        // POST: api/SystemUsers
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
