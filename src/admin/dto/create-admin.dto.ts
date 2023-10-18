import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('UZ')
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    tg_link: string;

    @IsStrongPassword()
    password: string;

    @IsStrongPassword()
    confirm_password: string;

    @IsString()
    description: string;
}
