import { IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    token: string;
    @IsString()
    message: string;
    @IsString()
    fullName: string;
    @IsNumber()
    timestamp: number;
}
