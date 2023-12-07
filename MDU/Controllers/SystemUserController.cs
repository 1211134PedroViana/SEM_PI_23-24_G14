using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.SystemUsers;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;
using SystemUserDTO = Mpt.Domain.SystemUsers.SystemUserDTO;

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
        public async Task<List<SystemUserDTO>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/SystemUsers/U1
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemUserDTO>> GetGetById(Guid id)
        {
            var user = await _service.GetByIdAsync(id);

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
            var user = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = user.Id }, user);
        }

        // PUT: api/SystemUsers/U1
        [HttpPut("{id}")]
        public async Task<ActionResult<SystemUserDTO>> Update(Guid id, SystemUserDTO dto)
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

        // DELETE: api/SystemUsers/U1/hard
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<SystemUserDTO>> HardDelete(Guid id)
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
