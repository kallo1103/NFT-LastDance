import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [];

  async findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  async create(userData: { email: string; password: string }) {
    const user = {
      id: this.users.length + 1,
      ...userData,
    };
    this.users.push(user);
    return user;
  }
} 