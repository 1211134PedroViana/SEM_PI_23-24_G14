using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Mpt.Domain.PickupAndDeliveryTasks;


namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotApprovedPicTask : ControllerBase
    {
        private readonly PickupAndDeliveryTaskService _service;

        public NotApprovedPicTask(PickupAndDeliveryTaskService service)
        {
            _service = service;
        }
        
        // GET: api/PickupAndDeliveryTasks/notApprovedTask
        [Authorize(Roles = "Task")]
        [HttpGet("notApprovedTasks")]
        public async Task<List<PickupAndDeliveryTask>> GetNotApprovedTasks()
        {
            return await _service.GetNotApprovedTasks();
        }
    }
}

