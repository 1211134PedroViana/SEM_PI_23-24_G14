import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ISystemUserDTO from '../dto/ISystemUserDTO';
import { SystemUser } from '../domain/systemUser';
import ISystemUserService from './IServices/ISystemUserService';
import ISystemUserRepo from './IRepos/ISystemUserRepo';
import { SystemUserMap } from '../mappers/SystemUserMap';
import { UserEmail } from '../domain/valueObjects/userEmail';

@Service()
export default class SystemUserService implements ISystemUserService {
  constructor(@Inject(config.repos.systemUser.name) private systemUserRepo: ISystemUserRepo) {}

  public async createSystemUser(systemUserDTO: ISystemUserDTO): Promise<Result<ISystemUserDTO>> {
    try {          
     
            const taskTypeDescriptionOrError = UserEmail.create(systemUserDTO.email);

      if (taskTypeDescriptionOrError.isFailure) {
        return Result.fail<ISystemUserDTO>(taskTypeDescriptionOrError.errorValue());
      }

      // checks if theres already a RobotType with the code provided
      const taskTypeDocument = await this.systemUserRepo.findByEmail(systemUserDTO.email);
      const found = !!taskTypeDocument;

      if (found) {
        return Result.fail<ISystemUserDTO>('System User already exists with email:' + systemUserDTO.email);
      }

      const taskTypeOrError = await SystemUser.create({
        email: systemUserDTO.email,
        role: systemUserDTO.role,
        id:systemUserDTO.id,
        password: systemUserDTO.password
      });

      if (taskTypeOrError.isFailure) {
        return Result.fail<ISystemUserDTO>(taskTypeOrError.errorValue());
      }
  
      const taskTypeResult = taskTypeOrError.getValue();
  
      // saves the new created building and returns the building DTO 
      await this.systemUserRepo.save(taskTypeResult);
  
      const taskTypeDTOResult = SystemUserMap.toDTO( taskTypeResult ) as ISystemUserDTO;
        return Result.ok<ISystemUserDTO>( taskTypeDTOResult )
      } catch (e) {
        throw e;
    }
}

}
