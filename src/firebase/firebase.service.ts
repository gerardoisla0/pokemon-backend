import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import * as admin from 'firebase-admin';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';

@Injectable()
export class FirebaseService {

    private readonly logger = new Logger(FirebaseService.name);
    
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

    async sendNotification(token: any, payload: any) {
        try {
            await admin.messaging().send({
                token: token,
                notification: payload
            });
        }catch(e){
            console.error('Error sending notification:', e);
        }
    }

    
    async sendMessage(createNotificationDto: CreateNotificationDto) {
        try{
            const newMessage = {
                fullName: createNotificationDto.fullName,
                message: createNotificationDto.message,
                timestamp: createNotificationDto.timestamp
            }
            const docRef = await admin.firestore().collection('messages').add(newMessage);

            return docRef;

        }catch(e){
            this.logger.error('Error sending notification:', e);
        }
    }

    async sendMessageRT(createNotificationDto: CreateNotificationDto) {
        try{
            const newMessage = {
                fullName: createNotificationDto.fullName,
                message: createNotificationDto.message,
                timestamp: createNotificationDto.timestamp
            }

            const messageRef = admin.database().ref('messages').push();
            await messageRef.set(newMessage);
            this.logger.log('Real-time message sent:', newMessage);

        }catch(e){
            this.logger.error('Error sending notification:', e);
        }
    }

}
