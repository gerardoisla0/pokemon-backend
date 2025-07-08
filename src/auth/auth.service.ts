import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService, // Assuming you have a FirebaseService to handle Firebase operations
  ) {}

  async create(createAuthDto: CreateAuthDto) {
   
    await this.findOne(createAuthDto);

    const userRecord = await this.firebaseService.create(createAuthDto);

    const user = this.userRepository.create(
      {
        email: createAuthDto.email,
        fullName: createAuthDto.fullName,
        firebaseUUID: userRecord?.uid,
      }
    );

    await this.userRepository.save(user);
    return user;

  }

  async login(loginAuthDto: LoginAuthDto) {
   
    const token = await this.firebaseService.verify(loginAuthDto);
    if(!token)
      throw new BadRequestException('Invalid credentials');

    const existingUser = await this.userRepository.findOne({
      where: { email: loginAuthDto.email },
      select: ['id', 'email', 'fullName'],
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
