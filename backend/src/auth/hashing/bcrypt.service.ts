import HashingService from './hashing.service';
import bcrypt from 'bcrypt';

export default class BcryptService extends HashingService {
  async hash(data: string): Promise<string> {
    const saltRounds = 10;
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(data, hashedData);
  }
}
