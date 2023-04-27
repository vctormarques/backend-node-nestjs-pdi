import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiTags('Login')
    @ApiOperation({ summary: 'Fazer o login' })
    async login(@Req() req: any){
        return await this.authService.login(req.user)
    }
}
