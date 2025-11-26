/*
  Warnings:

  - Added the required column `avatar_url` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `bio` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_username_key` TO `user_username_key`;
