import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, Matches } from "class-validator";
import { MessagesHelper } from "src/helpers/messages.helper";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
    
    @IsNotEmpty()
    @Matches(RegExHelper.password, {message: MessagesHelper.PASSWORD_VALID})
    @ApiProperty()
    password: string;
}

