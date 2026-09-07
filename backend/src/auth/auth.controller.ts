import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService, type AuthResult } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Public } from './public.decorator';
import type { AuthUser } from './auth-user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exchange credentials for a bearer token' })
  login(@Body() dto: LoginDto): Promise<AuthResult> {
    return this.auth.login(dto);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a clerk account' })
  signup(@Body() dto: SignupDto): Promise<AuthResult> {
    return this.auth.signup(dto);
  }

  /**
   * Authenticated, but stateless: the JWT stays valid until it expires. There is
   * no server-side revocation list, so this exists to give the client a single
   * endpoint to call and to keep the contract explicit — logging out twice with
   * the same token is a no-op that still answers 204.
   */
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'End the client session (token remains valid until expiry)' })
  logout(): void {
    return;
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'The principal behind the current bearer token' })
  me(@CurrentUser() user: AuthUser): AuthUser {
    return user;
  }
}
