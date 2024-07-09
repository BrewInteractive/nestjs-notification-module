import { NotificationModule, NotificationService } from './index';

describe('HasuraTest', () => {
  it('should export NotificationModule', () => {
    expect(NotificationModule).toBeDefined();
  });

  it('should export NotificationService', () => {
    expect(NotificationService).toBeDefined();
  });
});