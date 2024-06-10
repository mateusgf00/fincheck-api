import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankAccountType } from 'src/enums/BankAccountType';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
