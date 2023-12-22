using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.PickupAndDeliveryTasks
{
    public interface IPickupAndDeliveryTaskRepository: IRepository<PickupAndDeliveryTask,PickupAndDeliveryTaskId>
    {
        Task<List<PickupAndDeliveryTask>> GetTasksByStatus(TasksStatus status);
        Task<List<PickupAndDeliveryTask>> GetTasksByUser(SystemUserId userId);

        Task<List<PickupAndDeliveryTask>> GetTasksByNotApprovedStatus();

    }
}