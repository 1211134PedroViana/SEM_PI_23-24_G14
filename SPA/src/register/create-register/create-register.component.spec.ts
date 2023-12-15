import { mount } from 'cypress/react';
import { CreateRegisterComponent } from './create-register.component';

describe('RegisterComponent', () => {
  it('should mount', () => {
    mount(CreateRegisterComponent);
  });
});
