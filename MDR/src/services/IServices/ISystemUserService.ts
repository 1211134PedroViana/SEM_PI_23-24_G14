import { Result } from '../../core/logic/Result';
import IBuildingDTO from '../../dto/IBuildingDTO';
import ISystemUserDTO from '../../dto/ISystemUserDTO';

export default interface ISystemUserService {
  createSystemUser(systemUserDTO: ISystemUserDTO): Promise<Result<ISystemUserDTO>>;
}
