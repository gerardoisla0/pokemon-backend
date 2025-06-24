import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
   
    await this.findOne(createAuthDto);

    const user = this.userRepository.create(
      {
        email: createAuthDto.email,
        password: createAuthDto.password,
      }
    );

    await this.userRepository.save(user);
    return user;

  }

  async login(loginAuthDto: LoginAuthDto) {
   
    const existingUser = await this.userRepository.findOne({
      where: { email: loginAuthDto.email, password: loginAuthDto.password },
      select: ['id', 'email'],
    });

    if(!existingUser)
      throw new BadRequestException('Invalid credentials');

    return existingUser;
  }

  async findOne(createAuthDto: CreateAuthDto){
    const existingUser = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
    });

    if(existingUser)
      throw new BadRequestException('User already exists with this email');
  }
}
