using System.Threading.Tasks;
using System.Collections.Generic;
using Mpt.Domain.Shared;
using Mpt.Domain.SurveillanceTasks;

namespace Mpt.Domain.SurveillanceTasks
{
    public class SurveillanceTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISurveillanceTaskRepository _repo;

        public SurveillanceTaskService(IUnitOfWork unitOfWork, ISurveillanceTaskRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<SurveillanceTaskDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<SurveillanceTaskDTO> listDto = list.ConvertAll<SurveillanceTaskDTO>(task => 
                new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorIds, task.PhoneNumber, task.Status, task.UserId));

            return listDto;
        }

        public async Task<SurveillanceTaskDTO> GetByIdAsync(SurveillanceTaskId id)
        {
            var task = await this._repo.GetByIdAsync(id);
            
            if(task == null)
                return null;

            return new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorIds, task.PhoneNumber, task.Status, task.UserId);
        }

        public async Task<SurveillanceTaskDTO> AddAsync(CreateSurveillanceTaskDTO dto)
        {
            var task = new SurveillanceTask(dto.BuildingId, dto.FloorIds, dto.PhoneNumber, dto.UserId);

            await this._repo.AddAsync(task);

            await this._unitOfWork.CommitAsync();

            return new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorIds, task.PhoneNumber, task.Status, task.UserId);
        }

        public async Task<SurveillanceTaskDTO> DeleteAsync(SurveillanceTaskId id)
        {
            var task = await this._repo.GetByIdAsync(id); 

            if (task == null)
                return null;   
            
            this._repo.Remove(task);
            await this._unitOfWork.CommitAsync();

            return new SurveillanceTaskDTO(task.Id.AsGuid(), task.BuildingId, task.FloorIds, task.PhoneNumber, task.Status, task.UserId);
        }
    }
}