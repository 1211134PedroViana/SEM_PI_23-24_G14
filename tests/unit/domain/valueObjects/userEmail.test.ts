import { expect } from 'chai';
import { UserEmail } from '../../../../src/domain/valueObjects/userEmail';
import 'mocha';

describe('UserEmail Value Object', () => {
  it('Should create a valid UserEmail instance', () => {
    const emailResult = UserEmail.create('user@example.com');
    expect(emailResult.isSuccess).to.equal(true);
    const email = emailResult.getValue();
    expect(email.value).to.equal('user@example.com');
  });

  it('Should return a failure result when creating a UserEmail instance with null or undefined value', () => {
    const emailResult1 = UserEmail.create(null);
    const emailResult2 = UserEmail.create(undefined);
    expect(emailResult1.isFailure).to.equal(true);
    expect(emailResult2.isFailure).to.equal(true);
  });
});

