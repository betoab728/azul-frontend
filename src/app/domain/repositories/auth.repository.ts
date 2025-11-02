
import { LoginRequestDto } from 'src/app/application/dto/login-request.dto';
import { LoginResponseDto } from 'src/app/application/dto/user.dto';

export abstract class AuthRepository {
    abstract login(dto: LoginRequestDto): Promise<LoginResponseDto>;
  }