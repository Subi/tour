-- CreateTable
CREATE TABLE "Patch" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "Author" TEXT,

    CONSTRAINT "Patch_pkey" PRIMARY KEY ("id")
);
