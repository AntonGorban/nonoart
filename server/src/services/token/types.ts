import { D } from '@nono-art/domain';

export interface TokenPayload {
  readonly userId: D.User.Id;
  readonly role: D.User.Role;
}
