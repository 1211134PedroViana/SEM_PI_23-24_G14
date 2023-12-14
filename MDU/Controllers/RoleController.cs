using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using Mpt.Domain.Roles;

namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleService _service;

        public RolesController(RoleService service)
        {
            _service = service;
        }

        // GET: api/Roles
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Roles/1
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDTO>> GetGetById(Guid id)
        {
            var role = await _service.GetByIdAsync(new RoleId(id));

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        // POST: api/Roles
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<RoleDTO>> Create(CreateRoleDTO dto)
        {
            var role = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = role.Id }, role);
        }

        
        // PUT: api/Roles/1
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<RoleDTO>> Update(Guid id, RoleDTO dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var role = await _service.UpdateAsync(dto);
                
                if (role == null)
                {
                    return NotFound();
                }
                return Ok(role);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // DELETE: api/Roles/1
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<RoleDTO>> HardDelete(Guid id)
        {
            try
            {
                var role = await _service.DeleteAsync(new RoleId(id));

                if (role == null)
                {
                    return NotFound();
                }

                return Ok(role);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}