import crypto from 'crypto';

export default class TokenHashingService {
  generate() {
    return crypto.randomBytes(32).toString('hex');
  }

  hash(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
