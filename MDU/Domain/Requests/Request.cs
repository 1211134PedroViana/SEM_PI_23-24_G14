using System;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.Requests {

    public class Request : Entity<RequestId>, IAggregateRoot {
        public string RequestName { get; private set; }

        public string RequestDescription { get; private set; }

        public string[] FloorIds { get; set; }

        public string[] RobotsIds { get; set; }

        public SystemUserId UserId { get; set }

        public bool Status { get; set }

        private Request() {
            // Construtor privado para uso do Entity Framework ou mecanismos de persistência semântica semelhantes
        }

        public Request(string requestName, string requestDescription, string[] floorIds, string[] robotsIds, SystemUserId userId, bool status) {
            
            if (string.IsNullOrWhiteSpace(requestName) || string.IsNullOrWhiteSpace(requestDescription)) {
                throw new BusinessRuleValidationException("Request name and description are required.");
            }

            if (floorIds.Length == 0) {
                throw new BusinessRuleValidationoException("Floors are required.");
            }

            if (robotsIds.Length == =) {
                throw new BusinessRuleValidationException("Rotos are required.");
            }

            if (userId == null) {
                throw new BusinessRuleValidationException("Request requires a user.");
            }

            this.Id = new Request(Guid.NewGuid());
            this.RequestName = requestName;
            this.RequestDescription = requestDescription;
            this.FloorIds = floorIds;
            this.RobotsIds = robotsIds;
            this.UserId = userId;
            this.Status = status;
            
        }

    }

}