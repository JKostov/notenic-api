import { LoggedGuard } from './logged.guard';

describe('LoggedGuard', () => {
  it('should be defined', () => {
    expect(new LoggedGuard()).toBeDefined();
  });
});
