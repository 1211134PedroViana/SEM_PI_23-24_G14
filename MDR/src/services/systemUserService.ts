import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ISystemUserDTO from '../dto/ISystemUserDTO';
import { SystemUser } from '../domain/systemUser';
import ISystemUserService from './IServices/ISystemUserService';
import ISystemUserRepo from './IRepos/ISystemUserRepo';
import { SystemUserMap } from '../mappers/SystemUserMap';

@Service()
export default class SystemUserService implements ISystemUserService {
  constructor(@Inject(config.repos.systemUser.name) private systemUserRepo: ISystemUserRepo) {}

  public async createSystemUser(systemUserDto: ISystemUserDTO): Promise<Result<ISystemUserDTO>> {
    try {
      // Crie o SystemUser usando o método estático create
      const systemUserOrError = SystemUser.create(systemUserDto);

      if (systemUserOrError.isFailure) {
        return Result.fail<ISystemUserDTO>(systemUserOrError.errorValue());
      }

      const systemUserResult = systemUserOrError.getValue();

      // Salva o novo usuário do sistema e retorna o DTO correspondente
      await this.systemUserRepo.save(systemUserResult);

      const systemUserDTOResult = SystemUserMap.toDTO(systemUserResult) as ISystemUserDTO;
      return Result.ok<ISystemUserDTO>(systemUserDTOResult);
    } catch (error) {
      // Trate exceções adequadamente ou registre-as conforme necessário
      console.error(error);
      return Result.fail<ISystemUserDTO>('An unexpected error occurred.');
    }
  }
}
