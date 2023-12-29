using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsersCopy;

namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SystemUsersCopyController : ControllerBase
    {
        private readonly SystemUserCopyService _service;

        public SystemUsersCopyController(SystemUserCopyService service)
        {
            _service = service;

        }

        // GET: api/SystemUsersCopy
        //[Authorize(Roles = "SystemUser, Task")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemUserCopyDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/SystemUsersCopy/U1
        //[Authorize(Roles = "Admin, Task")]
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemUserCopyDTO>> GetGetById(Guid id)
        {
            var user = await _service.GetByIdAsync(new SystemUserCopyId(id));
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // GET: api/SystemUsersCopy/searchByEmail/1210825@isep.ipp.pt
        [AllowAnonymous]
        [HttpGet("ByEmail/{email}")]
        public async Task<ActionResult<SystemUserCopyDTO>> GetByEmail(string email)
        {
            var user = await _service.ByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // POST: api/SystemUsersCopy
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<SystemUserCopyDTO>> Create(CreateSystemUserCopyDTO dto)
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

        // DELETE: api/SystemUsersCopy/Remove
        [AllowAnonymous]
        [HttpDelete]
        public async Task<ActionResult<SystemUserCopyDTO>> Remove(SystemUserCopyId id)
        {
            try {

                var user = await _service.DeleteAsync(id);
                return Ok(user);
            } catch (BusinessRuleValidationException ex) {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/SystemUsersCopy/GetDay
        [AllowAnonymous]
        [HttpGet("GetDay")]
        public ActionResult<string> GetDay()
        {
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd");
            return Ok(currentDate);
        }

        // GET: api/SystemUsersCopy/GetTime
        [AllowAnonymous]
        [HttpGet("GetTime")]
        public ActionResult<string> GetTime()
        {
            string currentTime = DateTime.Now.ToString("HH:mm:ss");
            return Ok(currentTime);
        }

    }
}