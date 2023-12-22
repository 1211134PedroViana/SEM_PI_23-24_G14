using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.Shared;
using Mpt.Domain.Shared;

namespace Mpt.Infrastructure.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskRepository : BaseRepository<PickupAndDeliveryTask, PickupAndDeliveryTaskId>, IPickupAndDeliveryTaskRepository
    {
        private IPickupAndDeliveryTaskRepository _pickupAndDeliveryTaskRepositoryImplementation;

        public PickupAndDeliveryTaskRepository(MptDbContext context):base(context.PickupAndDeliveryTasks)
        {
           
        }

        public async Task<List<PickupAndDeliveryTask>> GetTasksByStatus(TasksStatus status)
        {
            return await _objs.Where(task => task.Status == status).ToListAsync();
        }

        public async Task<List<PickupAndDeliveryTask>> GetTasksByUser(SystemUserId userId)
        {
            return await _objs.Where(task => task.UserId == userId).ToListAsync();
        }

        public async Task<List<PickupAndDeliveryTask>> GetTasksByNotApprovedStatus()
        {
            return await _objs.Where(task => task.Status == TasksStatus.Pending || task.Status == TasksStatus.Refused)
                .ToListAsync();
        }
    }
}