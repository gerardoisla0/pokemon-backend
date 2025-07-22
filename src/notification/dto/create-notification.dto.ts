import { IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    token: string;
    @IsString()
    message: string;
}
