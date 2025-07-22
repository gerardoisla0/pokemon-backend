import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class NotificationService {

  constructor(
    private readonly FirebaseService: FirebaseService
  ){}

  async sendNotification(createNotificationDto: CreateNotificationDto) {
     const paypload = {
      title: 'Notification Pokedex',
      body: createNotificationDto.message
     }

     try{
        await this.FirebaseService.sendNotification(createNotificationDto.token, paypload);
     }catch (e){
      console.error('Error sending notification:', e);
     }
  }
}
