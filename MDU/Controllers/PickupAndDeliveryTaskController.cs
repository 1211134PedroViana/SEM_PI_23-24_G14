using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.Shared;
using Mpt.Domain.PickupAndDeliveryTasks;

namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickupAndDeliveryTaskController : ControllerBase
    {
        private readonly PickupAndDeliveryTaskService _service;

        public PickupAndDeliveryTaskController(PickupAndDeliveryTaskService service)
        {
            _service = service;
        }

        // GET: api/PickupAndDeliveryTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PickupAndDeliveryTaskDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/PickupAndDeliveryTasks/1
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
        [HttpPost]
        public async Task<ActionResult<PickupAndDeliveryTaskDTO>> Create(CreatePickupAndDeliveryTaskDTO dto)
        {
            var task = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = task.Id }, task);
        }

        
        // DELETE: api/PickupAndDeliveryTasks/1
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
    }
}