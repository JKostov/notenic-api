import { LoggedOrNotGuard } from './logged-or-not.guard';

describe('LoggedOrNotGuard', () => {
  it('should be defined', () => {
    expect(new LoggedOrNotGuard()).toBeDefined();
  });
});
