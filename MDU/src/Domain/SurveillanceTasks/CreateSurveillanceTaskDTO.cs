using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;


namespace Mpt.Domain.SurveillanceTasks
{
    public class CreateSurveillanceTaskDTO
    {
    
        public string BuildingId { get; private set; }
        public string FloorId { get; set; }
        public string StartPlace { get; set; }
        public string EndPlace { get; set; }
        public string PhoneNumber { get; set; }
        public SystemUserId UserId { get; set; }

        public CreateSurveillanceTaskDTO(string buildingId, string floorId, string startPlace, string endPlace, string phoneNumber, string userId)
        {
            this.BuildingId = buildingId;
            this.FloorId = floorId;
            this.StartPlace = startPlace;
            this.EndPlace = endPlace; 
            this.PhoneNumber = phoneNumber;
            if (Guid.TryParse(userId, out Guid userIdGuid))
            {
                this.UserId = new SystemUserId(userIdGuid);
            }
        }
    }
}