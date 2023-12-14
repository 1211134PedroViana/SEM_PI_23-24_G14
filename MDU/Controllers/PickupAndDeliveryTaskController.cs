using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using Mpt.Domain.PickupAndDeliveryTasks;

namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickupAndDeliveryTasksController : ControllerBase
    {
        private readonly PickupAndDeliveryTaskService _service;

        public PickupAndDeliveryTasksController(PickupAndDeliveryTaskService service)
        {
            _service = service;
        }

        // GET: api/PickupAndDeliveryTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PickupAndDeliveryTaskDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/PickupAndDeliveryTasks/searchByStatus/Pending
        [Authorize(Roles = "Task")]
        [HttpGet("searchByStatus/{status}")]
        public async Task<ActionResult<IEnumerable<PickupAndDeliveryTaskDTO>>> GetTasksByStatus(string status)
        {
            return await _service.GetByStatusAsync(status);
        }

        // GET: api/PickupAndDeliveryTasks/searchByUser/userId
        [Authorize(Roles = "Task, User")]
        [HttpGet("searchByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<PickupAndDeliveryTaskDTO>>> GetTasksByUser(string userId)
        {
            return await _service.GetByUserAsync(userId);
        }

        // GET: api/PickupAndDeliveryTasks/1
        [Authorize(Roles = "Task")]
        [HttpGet("{id}")]
        public async Task<ActionResult<PickupAndDeliveryTaskDTO>> GetGetById(Guid id)
        {
            var task = await _service.GetByIdAsync(new PickupAndDeliveryTaskId(id));

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/PickupAndDeliveryTasks
        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<ActionResult<PickupAndDeliveryTaskDTO>> Create(CreatePickupAndDeliveryTaskDTO dto)
        {
            var task = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = task.Id }, task);
        }

        
        // DELETE: api/PickupAndDeliveryTasks/1
        [Authorize(Roles = "Task")]
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<PickupAndDeliveryTaskDTO>> HardDelete(Guid id)
        {
            try
            {
                var task = await _service.DeleteAsync(new PickupAndDeliveryTaskId(id));

                if (task == null)
                {
                    return NotFound();
                }

                return Ok(task);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }

        // Patch: api/PickUpAndDeliveryTasks/approvePickupAndDeliveryTask/PickUpAndDeliveryTask
        [HttpPatch]
        public async Task<ActionResult<PickupAndDeliveryTaskDTO>> Approve(Guid id, PickupAndDeliveryTaskDTO dto) {
            if (id != dto.Id) {
                return BadRequest();
            }

            try {
                
                //dto = await _service.ApproveTask(id, dto);
                dto = null;

                if (dto == null) {
                    return NotFound();
                }
                return Ok(dto);
                
            } 
            catch (BusinessRuleValidationException ex) {
                return BadRequest(new {Message = ex.Message});
            }
        }   

        // Patch: api/PickUpAndDeliveryTasks/denyPickupAndDeliveryTask/PickUpAndDeliveyTask
        public async Task<ActionResult<PickupAndDeliveryTaskDTO>> Refuse(Guid id, PickupAndDeliveryTaskDTO dto) {
            if (id != null) {
                return BadRequest();
            }

            try {
                
                //dto = await _service.RefuseTask(id, dto);
                dto = null;

                if (dto == null) {
                    return NotFound();
                }
                return Ok(dto);
                
            }
            catch (BusinessRuleValidationException ex) {
                return BadRequest(new {Message = ex.Message});
            }
        }  
    }
}