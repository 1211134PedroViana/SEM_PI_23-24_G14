using Mpt.Domain.SurveillanceTasks;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.SurveillanceTasks
{
    public class SurveillanceTaskRepository : BaseRepository<SurveillanceTask, SurveillanceTaskId>, ISurveillanceTaskRepository
    {
    
        public SurveillanceTaskRepository(MptDbContext context):base(context.SurveillanceTasks)
        {
           
        }


    }
}