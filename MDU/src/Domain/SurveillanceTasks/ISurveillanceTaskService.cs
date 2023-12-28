using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SurveillanceTasks
{
    public interface ISurveillanceTaskService
    {
        Task<List<SurveillanceTaskDTO>> GetAllAsync();
        Task<SurveillanceTaskDTO> GetByIdAsync(SurveillanceTaskId id);
        Task<SurveillanceTaskDTO> AddAsync(CreateSurveillanceTaskDTO dto);
        Task<SurveillanceTaskDTO> DeleteAsync(SurveillanceTaskId id);
        Task<List<SurveillanceTaskDTO>> GetByStatusAsync(string status);
        Task<List<SurveillanceTaskDTO>> GetByUserAsync(string userId);
        Task<SurveillanceTaskDTO> ApproveTask(/*SystemUserId userId,*/ SurveillanceTaskDTO surveillanceTask);
        Task<SurveillanceTaskDTO> RefuseTask(/*SystemUserId userId,*/ SurveillanceTaskDTO surveillanceTask);
    }
}