using System.Threading.Tasks;
using System.Collections.Generic;
using Mpt.Domain.Shared;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SurveillanceTasks
{
    public class SurveillanceTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISurveillanceTaskRepository _repo;
        private readonly ISystemUserRepository _userRepo;

        public SurveillanceTaskService(IUnitOfWork unitOfWork, ISurveillanceTaskRepository repo, ISystemUserRepository userRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._userRepo = userRepo;
        }

        public async Task<List<SurveillanceTaskDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<SurveillanceTaskDTO> listDto = list.ConvertAll<SurveillanceTaskDTO>(task => 
                new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorId, task.StartPlace, task.EndPlace, 
                task.PhoneNumber, task.Status, task.UserId));

            return listDto;
        }

        public async Task<SurveillanceTaskDTO> GetByIdAsync(SurveillanceTaskId id)
        {
            var task = await this._repo.GetByIdAsync(id);
            
            if(task == null)
                return null;

            return new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorId, task.StartPlace, task.EndPlace, 
            task.PhoneNumber, task.Status, task.UserId);
        }

        public async Task<SurveillanceTaskDTO> AddAsync(CreateSurveillanceTaskDTO dto)
        {
            await checkUserIdAsync(dto.UserId);
            var task = new SurveillanceTask(dto.BuildingId, dto.FloorId, dto.StartPlace, dto.EndPlace, dto.PhoneNumber, dto.UserId);

            await this._repo.AddAsync(task);

            await this._unitOfWork.CommitAsync();

            return new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorId, task.StartPlace, task.EndPlace, 
            task.PhoneNumber, task.Status, task.UserId);
        }

        public async Task<SurveillanceTaskDTO> DeleteAsync(SurveillanceTaskId id)
        {
            var task = await this._repo.GetByIdAsync(id); 

            if (task == null)
                return null;   
            
            this._repo.Remove(task);
            await this._unitOfWork.CommitAsync();

            return new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorId, task.StartPlace, task.EndPlace, 
            task.PhoneNumber, task.Status, task.UserId);
        }

        public async Task<List<SurveillanceTaskDTO>> GetByStatusAsync(string status)
        {
            if (Enum.TryParse<TasksStatus>(status, true, out var parsedStatus))
            {
                var list = await this._repo.GetTasksByStatus(parsedStatus);

                List<SurveillanceTaskDTO> listDto = list.ConvertAll<SurveillanceTaskDTO>(task => 
                    new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorId, task.StartPlace, task.EndPlace,
                    task.PhoneNumber, task.Status, task.UserId));

                return listDto;
            }
            else
            {
                return null;
            }
        
        }

        public async Task<List<SurveillanceTaskDTO>> GetByUserAsync(string userId)
        {

            if (Guid.TryParse(userId, out Guid userIdGuid))
            {
                var parsedUserId = new SystemUserId(userIdGuid);

                var list = await this._repo.GetTasksByUser(parsedUserId);

                List<SurveillanceTaskDTO> listDto = list.ConvertAll<SurveillanceTaskDTO>(task => 
                    new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorId, task.StartPlace, task.EndPlace, 
                    task.PhoneNumber, task.Status, task.UserId));

                return listDto;

            }else{
                return null;
            }
            
        }

        private async Task checkUserIdAsync(SystemUserId userId)
        {
           var user = await _userRepo.GetByIdAsync(userId);
           if (user == null)
                throw new BusinessRuleValidationException("Invalid User Id.");
        }
    }
}