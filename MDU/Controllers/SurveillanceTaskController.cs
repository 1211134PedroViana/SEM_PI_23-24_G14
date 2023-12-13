using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using Mpt.Domain.SurveillanceTasks;

namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveillanceTasksController : ControllerBase
    {
        private readonly SurveillanceTaskService _service;

        public SurveillanceTasksController(SurveillanceTaskService service)
        {
            _service = service;
        }

        // GET: api/SurveillanceTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SurveillanceTaskDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/SurveillanceTasks/searchByStatus/Pending
        [HttpGet("searchByStatus/{status}")]
        public async Task<ActionResult<IEnumerable<SurveillanceTaskDTO>>> GetTasksByStatus(string status)
        {
            return await _service.GetByStatusAsync(status);
        }

        // GET: api/SurveillanceTasks/searchByUser/userId
        [HttpGet("searchByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<SurveillanceTaskDTO>>> GetTasksByUser(string userId)
        {
            return await _service.GetByUserAsync(userId);
        }

        // GET: api/SurveillanceTasks/1
        [HttpGet("{id}")]
        public async Task<ActionResult<SurveillanceTaskDTO>> GetGetById(Guid id)
        {
            var task = await _service.GetByIdAsync(new SurveillanceTaskId(id));

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/SurveillanceTasks
        [HttpPost]
        public async Task<ActionResult<SurveillanceTaskDTO>> Create(CreateSurveillanceTaskDTO dto)
        {
            var task = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = task.Id }, task);
        }

        
        // DELETE: api/SurveillanceTasks/1
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<SurveillanceTaskDTO>> HardDelete(Guid id)
        {
            try
            {
                var task = await _service.DeleteAsync(new SurveillanceTaskId(id));

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

        // Patch: api/PickUpAndDeliveryTasks/RefuseTask/SurveillanceTaskDTO
        public async Task<ActionResult<SurveillanceTaskDTO>> Approve(Guid id, SurveillanceTaskDTO dto) {
            if (id != dto.Id) {
                return BadRequest();
            }

            try {
                dto = await _service.ApproveTask(id, dto);

                if (dto == null) {
                    return NotFound();
                }
                return Ok(dto);
            } 
            catch (BusinessRuleValidationException ex) {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Patch: api/PickUpAndDeliveryTasks/RefuseTask/SurveillanceTaskDTO
        public async Task<ActionResult<SurveillanceTaskDTO>> Approve(Guid id, SurveillanceTaskDTO dto) {
            if (id != dto.Id) {
                return BadRequest();
            }

            try {
                dto = await _service.ApproveTask(id, dto);

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