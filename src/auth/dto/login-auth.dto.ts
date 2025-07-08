import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    token: string;
}
