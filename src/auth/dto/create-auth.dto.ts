import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6)
    @MaxLength(12)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    })
    password: string;
    @IsString()
    @MinLength(5)
    fullName: string;
}
