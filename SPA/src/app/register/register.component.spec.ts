import { mount } from 'cypress/react';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  it('should mount', () => {
    mount(RegisterComponent);
  });
});
