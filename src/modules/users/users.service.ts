import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UsersRepository) {}

  async getUserById(userId: string) {
      const user = await this.userRepository.findUnique({
        where: {id: userId}
      })

      return {
        name: user.name,
        email: user.email
      }
  }

}
