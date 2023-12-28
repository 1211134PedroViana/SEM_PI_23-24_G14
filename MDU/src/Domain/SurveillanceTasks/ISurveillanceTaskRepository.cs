using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SurveillanceTasks
{
    public interface ISurveillanceTaskRepository: IRepository<SurveillanceTask,SurveillanceTaskId>
    {
        Task<List<SurveillanceTask>> GetTasksByStatus(TasksStatus status);
        Task<List<SurveillanceTask>> GetTasksByUser(SystemUserId userId);

    }
}