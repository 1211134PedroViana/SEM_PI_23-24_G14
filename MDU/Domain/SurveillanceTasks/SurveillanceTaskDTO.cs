using System;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Shared;

namespace Mpt.Domain.SurveillanceTasks
{
    public class SurveillanceTaskDTO
    {
        public Guid Id { get; set; }
        public string BuildingId { get; private set; }
        public string[] FloorIds { get; set; }
        public string PhoneNumber { get; set; }
        public TasksStatus Status { get; set; }
        public SystemUserId UserId { get; set; }

        public SurveillanceTaskDTO(Guid Id, string buildingId, string[] floorIds, string phoneNumber, TasksStatus status, SystemUserId userId)
        {
            this.Id = Id;
            this.BuildingId = buildingId;
            this.FloorIds = floorIds; 
            this.PhoneNumber = phoneNumber;
            this.Status = status;
            this.UserId = userId;
        }
    }
}