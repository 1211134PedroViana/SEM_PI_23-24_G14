using System;
using Newtonsoft.Json;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Shared;

namespace Mpt.Domain.SurveillanceTasks
{
    public class SurveillanceTaskDTO
    {
        public Guid Id { get; set; }
        public string BuildingId { get; private set; }
        public string FloorId { get; set; }
        public string StartPlace { get; set; }
        public string EndPlace { get; set; }
        public string PhoneNumber { get; set; }
        
        [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
        public TasksStatus Status { get; set; }
        public string UserId { get; set; }

        public SurveillanceTaskDTO(Guid Id, string buildingId, string floorId, string startPlace, string endPlace, string phoneNumber, TasksStatus status, SystemUserId userId)
        {
            this.Id = Id;
            this.BuildingId = buildingId;
            this.FloorId = floorId; 
            this.StartPlace = startPlace;
            this.EndPlace = endPlace; 
            this.PhoneNumber = phoneNumber;
            this.Status = status;
            this.UserId = userId.AsString();
        }
    }
}