-- CreateTable
CREATE TABLE "Patch" (
    "id" SERIAL NOT NULL,
    "state" TEXT,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isApproved" BOOLEAN,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Patch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "isBanned" BOOLEAN NOT NULL,
    "AvatarUrl" TEXT,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_username_key" ON "Author"("username");

-- AddForeignKey
ALTER TABLE "Patch" ADD CONSTRAINT "Patch_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
