-- CreateEnum
CREATE TYPE "banck_account_type" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "inicial_balance" DOUBLE PRECISION NOT NULL,
    "type" "banck_account_type" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
