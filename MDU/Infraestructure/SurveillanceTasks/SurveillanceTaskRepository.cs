using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Infrastructure.Shared;
using Mpt.Domain.Shared;

namespace Mpt.Infrastructure.SurveillanceTasks
{
    public class SurveillanceTaskRepository : BaseRepository<SurveillanceTask, SurveillanceTaskId>, ISurveillanceTaskRepository
    {
    
        public SurveillanceTaskRepository(MptDbContext context):base(context.SurveillanceTasks)
        {
           
        }

         public async Task<List<SurveillanceTask>> GetTasksByStatus(TasksStatus status)
        {
            return await _objs.Where(task => task.Status == status).ToListAsync();
        }

        public async Task<List<SurveillanceTask>> GetTasksByUser(SystemUserId userId)
        {
            return await _objs.Where(task => task.UserId == userId).ToListAsync();
        }

    }
}