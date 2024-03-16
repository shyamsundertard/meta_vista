-- CreateTable
CREATE TABLE "Metainfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB[],
    "parentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metainfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metainfo_title_key" ON "Metainfo"("title");
