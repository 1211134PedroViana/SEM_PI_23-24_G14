using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskRepository : BaseRepository<PickupAndDeliveryTask, PickupAndDeliveryTaskId>, IPickupAndDeliveryTaskRepository
    {
    
        public PickupAndDeliveryTaskRepository(MptDbContext context):base(context.PickupAndDeliveryTasks)
        {
           
        }


    }
}