using System;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.SurveillanceTasks
{
    public class CreateSurveillanceTaskDTO
    {
    
        public string BuildingId { get; private set; }
        public string[] FloorIds { get; set; }
        public string PhoneNumber { get; set; }
        public SystemUser User { get; set; }

        public CreateSurveillanceTaskDTO(string buildingId, string[] floorIds, string phoneNumber, SystemUser user)
        {
            this.BuildingId = buildingId;
            this.FloorIds = floorIds; 
            this.PhoneNumber = phoneNumber;
            this.User = user;
        }
    }
}