-- CreateTable
CREATE TABLE "cars_specifications" (
    "id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_specifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_specifications" ADD CONSTRAINT "cars_specifications_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "cars_specifications" ADD CONSTRAINT "cars_specifications_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;
