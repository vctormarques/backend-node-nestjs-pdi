import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse,  ApiTags } from '@nestjs/swagger';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponse } from './response/user.swagger';
import { BadRequest } from 'src/helpers/bad-request.swagger';
import { NotFound } from 'src/helpers/not-found.swagger';

@Controller('api/v1/users')
@ApiTags('Usuários')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    @ApiOperation({ summary: 'Listar todos usuários' })
    @ApiResponse({
        type: UserResponse,
        isArray: true
    })
    async index(@Query() query: QueryUserDto) {
        return await this.userService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Cadastrar um usuário' })
    @ApiResponse({
        status: 400,
        description: 'Parâmetros inválidos',
        type: BadRequest,
    })    
    async store(@Body() body: CreateUserDto) {
        return await this.userService.store(body);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um usuário' })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findOneOrFail({id});
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar os dados de um usuário' })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
        type: NotFound,
    })        
    @ApiResponse({
        status: 400,
        description: 'Dados inválidos',
        type: BadRequest,
    })        
    async update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() body: UpdateUserDto
    ) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover um usuário' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.userService.destroy(id);
    }


}
