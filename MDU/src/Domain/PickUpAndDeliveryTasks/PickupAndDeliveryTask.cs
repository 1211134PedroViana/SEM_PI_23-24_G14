using System;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTask : Entity<PickupAndDeliveryTaskId>, IAggregateRoot
    {
        public string PickupPlace { get; set; }
        public string DeliveryPlace { get; set; }
        public string PickupPersonName { get; set; }
        public string PickupPersonPhoneNumber { get; set; }
        public string DeliveryPersonName { get; set; }
        public string DeliveryPersonPhoneNumber { get; set; }
        public string Description { get; set; }
        public string ConfirmationCode { get; set; }
        public TasksStatus Status { get; set; }
        public SystemUserId UserId { get; set; }

        private PickupAndDeliveryTask()
        {
            // Construtor privado para uso do Entity Framework ou mecanismos de persistência semântica semelhantes
        }

        public PickupAndDeliveryTask(
            string pickupPlace,
            string deliveryPlace,
            string pickupPersonName,
            string pickupPersonPhoneNumber,
            string deliveryPersonName,
            string deliveryPersonPhoneNumber,
            string description,
            string confirmationCode,
            SystemUserId userId)
        {
            Id = new PickupAndDeliveryTaskId(Guid.NewGuid());
            this.PickupPlace = pickupPlace;
            this.DeliveryPlace = deliveryPlace;
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.Description = description;
            this.ConfirmationCode = confirmationCode;
            this.Status = TasksStatus.Pending;
            this.UserId = userId;
        }
    }
    
}