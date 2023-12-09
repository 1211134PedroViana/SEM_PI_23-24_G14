using System;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Shared;

namespace Mpt.Domain.SurveillanceTasks
{
    public class CreateSurveillanceTaskDTO
    {
    
        public string BuildingId { get; private set; }
        public string[] FloorIds { get; set; }
        public string StartPlace { get; set; }
        public string EndPlace { get; set; }
        public string PhoneNumber { get; set; }
        public SystemUserId UserId { get; set; }

        public CreateSurveillanceTaskDTO(string buildingId, string startPlace, string endPlace, string[] floorIds, string phoneNumber, SystemUserId userId)
        {
            this.BuildingId = buildingId;
            this.FloorIds = floorIds;
            this.StartPlace = startPlace;
            this.EndPlace = endPlace; 
            this.PhoneNumber = phoneNumber;
            this.UserId = userId;
        }
    }
}