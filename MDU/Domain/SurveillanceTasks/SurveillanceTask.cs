using System;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SurveillanceTasks
{
    public class SurveillanceTask : Entity<SurveillanceTaskId>, IAggregateRoot
    {
        public string BuildingId { get; private set; }
        public string[] FloorIds { get; set; }
        public string PhoneNumber { get; set; }
        public TasksStatus Status { get; set; }
        public SystemUser User { get; set; }

        private SurveillanceTask()
        {
            // Construtor privado para uso do Entity Framework ou mecanismos de persistência semântica semelhantes
        }

        public SurveillanceTask(string buildingId, string[] floorIds, string phoneNumber, SystemUser user)
        {
            if (string.IsNullOrWhiteSpace(buildingId) || string.IsNullOrWhiteSpace(phoneNumber))
                throw new BusinessRuleValidationException("Building and Phone number are required.");

            if(floorIds.Length == 0) 
                throw new BusinessRuleValidationException("Floors are required.");

            this.Id = new SurveillanceTaskId(Guid.NewGuid());
            this.BuildingId = buildingId;
            this.FloorIds = floorIds; 
            this.PhoneNumber = phoneNumber;
            this.Status = TasksStatus.Pending;
            this.User = user;
          
        }
    }
}