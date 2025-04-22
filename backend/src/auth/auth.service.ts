import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = new Map<string, { username: string; password: string }>();

  constructor(private jwtService: JwtService) {}

  async register(username: string, password: string) {
    if (this.users.has(username)) {
      throw new UnauthorizedException('Username already exists');
    }

    this.users.set(username, { username, password });
    return this.generateToken(username);
  }

  async login(username: string, password: string) {
    const user = this.users.get(username);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(username);
  }

  private generateToken(username: string) {
    const payload = { username, sub: username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 