import { OmitType } from "@nestjs/swagger";
import { UsersEntity } from "../users.entity";

export class UserResponse extends OmitType(UsersEntity, [
    'createdAt',
    'updatedAt',
    'deleteAt'
]) {}