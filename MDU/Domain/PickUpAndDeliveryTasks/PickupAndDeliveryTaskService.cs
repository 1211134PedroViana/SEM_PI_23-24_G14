using System.Threading.Tasks;
using System.Collections.Generic;
using Mpt.Domain.Shared;
using Mpt.Domain.PickupAndDeliveryTasks;

namespace Mpt.Domain.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPickupAndDeliveryTaskRepository _repo;

        public PickupAndDeliveryTaskService(IUnitOfWork unitOfWork, IPickupAndDeliveryTaskRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<PickupAndDeliveryTaskDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<PickupAndDeliveryTaskDTO> listDto = list.ConvertAll<PickupAndDeliveryTaskDTO>(task => 
                new PickupAndDeliveryTaskDTO(task.Id.AsGuid(), task.PickupPlace, task.DeliveryPlace, task.PickupPersonName, 
                task.PickupPersonPhoneNumber, task.DeliveryPersonName, task.DeliveryPersonPhoneNumber, task.Description,
                task.ConfirmationCode, task.Status, task.UserId));

            return listDto;
        }

        public async Task<PickupAndDeliveryTaskDTO> GetByIdAsync(PickupAndDeliveryTaskId id)
        {
            var task = await this._repo.GetByIdAsync(id);
            
            if(task == null)
                return null;

            return new PickupAndDeliveryTaskDTO(task.Id.AsGuid(), task.PickupPlace, task.DeliveryPlace, task.PickupPersonName, 
                task.PickupPersonPhoneNumber, task.DeliveryPersonName, task.DeliveryPersonPhoneNumber, task.Description,
                task.ConfirmationCode, task.Status, task.UserId);
        }

        public async Task<PickupAndDeliveryTaskDTO> AddAsync(CreatePickupAndDeliveryTaskDTO dto)
        {
            var task = new PickupAndDeliveryTask(dto.PickupPlace, dto.DeliveryPlace, dto.PickupPersonName, 
            dto.PickupPersonPhoneNumber, dto.DeliveryPersonName, dto.DeliveryPersonPhoneNumber, dto.Description, 
            dto.ConfirmationCode, dto.UserId);

            await this._repo.AddAsync(task);

            await this._unitOfWork.CommitAsync();

            return new PickupAndDeliveryTaskDTO(task.Id.AsGuid(), task.PickupPlace, task.DeliveryPlace, task.PickupPersonName, 
                task.PickupPersonPhoneNumber, task.DeliveryPersonName, task.DeliveryPersonPhoneNumber, task.Description,
                task.ConfirmationCode, task.Status, task.UserId);
        }

        public async Task<PickupAndDeliveryTaskDTO> DeleteAsync(PickupAndDeliveryTaskId id)
        {
            var task = await this._repo.GetByIdAsync(id); 

            if (task == null)
                return null;   
            
            this._repo.Remove(task);
            await this._unitOfWork.CommitAsync();

            return new PickupAndDeliveryTaskDTO(task.Id.AsGuid(), task.PickupPlace, task.DeliveryPlace, task.PickupPersonName, 
                task.PickupPersonPhoneNumber, task.DeliveryPersonName, task.DeliveryPersonPhoneNumber, task.Description,
                task.ConfirmationCode, task.Status, task.UserId);
        }
    }
}