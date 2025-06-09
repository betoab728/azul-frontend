
import { LoginRequestDto } from '../../application/dto/login-request.dto';
import { LoginResponseDto } from '../../application/dto/login-response.dto';

export abstract class AuthRepository {
    abstract login(dto: LoginRequestDto): Promise<LoginResponseDto>;
  }