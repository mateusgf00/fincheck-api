import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountRepository } from 'src/shared/database/repositories/bankAccount.repository';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  create(createBankAccountDto: CreateBankAccountDto, userId: string) {
    const { name, color, initialBalance, type } = createBankAccountDto;

    return this.bankAccountRepository.create({
      data: {
        name,
        color,
        initialBalance,
        type,
        userId,
      },
    });
  }

  findAllByUserId(userId) {
    return this.bankAccountRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async update(
    id: string,
    updateBankAccountDto: UpdateBankAccountDto,
    userId: string,
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto;

    await this.validateBankAccountOwnership(userId, id);

    return this.bankAccountRepository.update({
      where: { id },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.validateBankAccountOwnership(userId, id);

    await this.bankAccountRepository.delete({
      where: { id },
    });

    return null;
  }

  private async validateBankAccountOwnership(
    userId: string,
    bankAccountId: string,
  ) {
    const isOwner = await this.bankAccountRepository.findFirst({
      where: { id: bankAccountId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.');
    }
  }
}
