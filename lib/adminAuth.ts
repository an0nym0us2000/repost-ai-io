import { createHmac } from 'crypto';

const SECRET = process.env.NEXTAUTH_SECRET!;
const TOKEN_VALUE = 'admin-authenticated';
export const ADMIN_COOKIE_NAME = 'admin-session';

export function signAdminToken(): string {
  const hmac = createHmac('sha256', SECRET);
  hmac.update(TOKEN_VALUE);
  return `${TOKEN_VALUE}.${hmac.digest('hex')}`;
}

export function verifyAdminToken(token: string): boolean {
  if (!SECRET) return false;
  const expected = signAdminToken();
  return token === expected;
}
