-- AlterTable
ALTER TABLE `task` ADD COLUMN `status` ENUM('completed', 'pending', 'rejected') NOT NULL DEFAULT 'pending';
