import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import * as admin from 'firebase-admin';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

@Injectable()
export class FirebaseService {

    async create(createAuthDto: CreateAuthDto) {
        try{
            const userRecord = await admin.auth().createUser({
                email: createAuthDto.email,
                password: createAuthDto.password,
                displayName: createAuthDto.fullName,
            });
            console.log(userRecord);
            return userRecord;
        }catch(e){
            console.error('Error creating user in Firebase:', e);
        }
    }

    async verify(loginAuthDto: LoginAuthDto){
        try{
            const decodedToken = await admin.auth().verifyIdToken(loginAuthDto.token);
            return decodedToken;
        }catch(e){
            console.error('Error verifying user in Firebase:', e);
        }
    }
}
