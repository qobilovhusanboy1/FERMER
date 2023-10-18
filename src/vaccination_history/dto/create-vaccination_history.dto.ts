import { IsString } from "class-validator";

export class CreateVaccinationHistoryDto {
    @IsString()
    animal_id: string;

    @IsString()
    vaccine_id: string;

    @IsString()
    worker_id: string

    vaccinate_date: Date;

    next_vaccinate_date: Date;
}
