using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SystemUsers;

namespace DDDSample1.Controllers
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
        public async Task<ActionResult<IEnumerable<SystemUserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/SystemUsers/U1
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemUserDto>> GetGetById(String id)
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
        public async Task<ActionResult<SystemUserDto>> Create(SystemUserDto dto)
        {
            var user = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = user.Id }, user);
        }

        // PUT: api/SystemUsers/U1
        [HttpPut("{id}")]
        public async Task<ActionResult<SystemUserDto>> Update(String id, SystemUserDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var user = await _service.UpdateAsync(dto);

                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/SystemUsers/U1
        [HttpDelete("{id}")]
        public async Task<ActionResult<SystemUserDto>> SoftDelete(String id)
        {
            var user = await _service.InactivateAsync(new SystemUserId(id));

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // DELETE: api/SystemUsers/U1/hard
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<SystemUserDto>> HardDelete(String id)
        {
            try
            {
                var user = await _service.DeleteAsync(new SystemUserId(id));

                if (user == null)
                {
                    return NotFound();
                }

                return Ok(user);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}
