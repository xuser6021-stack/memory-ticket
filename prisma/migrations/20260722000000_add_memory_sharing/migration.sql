-- AlterTable
ALTER TABLE "Memory" ADD COLUMN "shareId" TEXT,
ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- Backfill existing records before making shareId required.
UPDATE "Memory" SET "shareId" = 'shr_' || "id" WHERE "shareId" IS NULL;

-- AlterTable
ALTER TABLE "Memory" ALTER COLUMN "shareId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Memory_shareId_key" ON "Memory"("shareId");
