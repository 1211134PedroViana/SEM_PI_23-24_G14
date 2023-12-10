/*
using System;
using Mpt.Domain.Requests;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Requests {
    
    public class RequestDTO {

        public Guid Id { get; set; }

        public string RequestName { get; private set; }

        public string RequestDescription { get; private set; }

        public string[] FloorIds { get; set; }

        public string[] RobotsIds { get; set; }

        public SystemUserId UserId { get; set }

        public bool Status { get; set }

        public RequestDTO(Guid Id, string requestName, string requestDescription, string[] floorIds, string[] robotsIds, SystemUserId userId,bool status) {
            this.Id = Id;
            this.RequestName = requestName;
            this.RequestDescription = requestDescription;
            this.FloorIds = floorIds;
            this.RobotsIds = robotsIds;
            this.UserId = userId;
            this.Status = status;
        }

    }

}
*/