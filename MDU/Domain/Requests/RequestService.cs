/*
using System.Threading.Requests;
using System.Collections.Generic;
using Mpt.Domain.Shared;
using Mpt.Domain.Requests;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.Requests {

    public class RequestService {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRequestRepository _repo;
        private readonly ISystemUserRepository _userRepo;

        public RequestService(IUnitOfWork unitOfWork, IRequestRepositoy repo, ISystemUserRepositoy userRepo) {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._userRepo = userRepo;
        }

        public async Request<List<RequestTO>> GetAllAsync() {
            var list = await this._repo.GetAllAsync();

            List<RequesDTO> listDto = list.ConvertAll<RequestDTO>(request => 
                new RequestDTO(request.Id.AsGuid(), request.requestName, request.requestDescription, request.floorIds, 
                request.robotsIds, request.UserId, request.Status));    
            
            return listDto;
        }

        public async Requests<RequestDTO> GetByIdAsync(RequestId id) {
            var request = await this._repo.GetByIdAsync(id);

            if (request == null) {
                return null;
            }

            return new RequestDTO(request.Id.AsGuid(), request.requestName, request.requestDescription, request.floorIds, request.robotsIds, 
            request.UserId, request.Status);   
        }

        public async Request<RequestDTO> AddAsync(CreateRequestDTO dto) {
            await checkeUserIdAsync(dto.UserId);
            var request = new Request(dto.requestName, dto.requestDescription, dto.floorIds, dto.robotsIds, dto.UserId, dto.Status);

            await this._repo.AddAsync(request);

            await this._unitOfWork.CommitAsync();

            return new RequestDTO(request.Id.AsGuid(), request.requestName, request.requestDescription, request.floorIds, request.robotsIds,
            request.userId, request.status);
        }
    }

}
*/