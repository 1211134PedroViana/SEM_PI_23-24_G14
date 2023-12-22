using System.Threading.Tasks;
using System.Collections.Generic;
using Mpt.Domain.Shared;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPickupAndDeliveryTaskRepository _repo;
        private readonly ISystemUserRepository _userRepo;

        public PickupAndDeliveryTaskService(IUnitOfWork unitOfWork, IPickupAndDeliveryTaskRepository repo, ISystemUserRepository userRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._userRepo = userRepo;
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
            await checkUserIdAsync(dto.UserId);
            
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

        public async Task<List<PickupAndDeliveryTaskDTO>> GetByStatusAsync(string status)
        {
            if (Enum.TryParse<TasksStatus>(status, true, out var parsedStatus))
            {
                var list = await this._repo.GetTasksByStatus(parsedStatus);

                List<PickupAndDeliveryTaskDTO> listDto = list.ConvertAll<PickupAndDeliveryTaskDTO>(task =>           
                    new PickupAndDeliveryTaskDTO(task.Id.AsGuid(), task.PickupPlace, task.DeliveryPlace, task.PickupPersonName, 
                    task.PickupPersonPhoneNumber, task.DeliveryPersonName, task.DeliveryPersonPhoneNumber, task.Description,
                    task.ConfirmationCode, task.Status, task.UserId));

                return listDto;
            }
            else
            {
                return null;
            }
        
        }

        public async Task<List<PickupAndDeliveryTaskDTO>> GetByUserAsync(string userId)
        {

            if (Guid.TryParse(userId, out Guid userIdGuid))
            {
                var parsedUserId = new SystemUserId(userIdGuid);

                var list = await this._repo.GetTasksByUser(parsedUserId);

                List<PickupAndDeliveryTaskDTO> listDto = list.ConvertAll<PickupAndDeliveryTaskDTO>(task => 
                    new PickupAndDeliveryTaskDTO(task.Id.AsGuid(), task.PickupPlace, task.DeliveryPlace, task.PickupPersonName, 
                    task.PickupPersonPhoneNumber, task.DeliveryPersonName, task.DeliveryPersonPhoneNumber, task.Description,
                    task.ConfirmationCode, task.Status, task.UserId));

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

        private async void approveTask(SystemUserId userId, PickupAndDeliveryTaskDTO pickupAndDeliveryTask) {
            var user = await _userRepo.GetByIdAsync(userId);
            //TaskStatus taskStatus;

            if (userId == null) {
                throw new BusinessRuleValidationException("Invalid User Id.");
            }
            
            /*
            Falta verificar se o user é admin
            */

            pickupAndDeliveryTask.Status = TasksStatus.Approved;
        }

        private async void refuseTask(SystemUserId userId, PickupAndDeliveryTaskDTO pickupAndDeliveryTask) {
            var user = await _userRepo.GetByIdAsync(userId);

            if (userId == null) {
                throw new BusinessRuleValidationException("Invalid User Id.");
            }
                        
            /*
            Falta verificar se o user é admin
            */

            pickupAndDeliveryTask.Status = TasksStatus.Refused;
        }
        
        public async Task<List<PickupAndDeliveryTask>> GetNotApprovedTasks()
        {
            // Lógica para obter tarefas por status "Pending" e "Refused"
            // Certifique-se de implementar essa lógica de acordo com suas necessidades
            return await _repo.GetTasksByNotApprovedStatus();
        }
       
    }

}