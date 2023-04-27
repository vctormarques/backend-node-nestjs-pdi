import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, Entity } from 'typeorm';
import { hashSync } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'users'})
export class UsersEntity {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty()
    createdAt: string;

    @UpdateDateColumn({name: 'update_at'})
    @ApiProperty()
    updatedAt: string;

    @DeleteDateColumn({name: 'delete_at'})
    @ApiProperty()
    deleteAt: string;

    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }

}