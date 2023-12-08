using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
            var users = await _service.GetAllAsync();
            return Ok(users);
        }

        // GET: api/SystemUsers/U1
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemUserDTO>> GetById(Guid id)
        {
            var user = await _service.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/SystemUsers
        [HttpPost]
        public async Task<ActionResult<SystemUserDTO>> Create(CreateSystemUserDTO dto)
        {
            var user = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
    }
}
