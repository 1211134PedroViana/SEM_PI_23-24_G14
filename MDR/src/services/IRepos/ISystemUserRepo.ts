import { Repo } from '../../core/infra/Repo';

import { SystemUser } from '../../domain/systemUser';

export default interface ISystemUserRepo extends Repo<SystemUser> {
  save(systemUser: SystemUser): Promise<SystemUser>;
  exists(systemUser: SystemUser): Promise<boolean>;
  findByDomainId(systemUserId: string): Promise<SystemUser | null>;
  findByEmail(email: string): Promise<SystemUser | null>;
}
