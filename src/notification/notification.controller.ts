import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);
  
  constructor(private readonly notificationService: NotificationService) {}

  @Post('sendNotification')
  sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.sendNotification(createNotificationDto);
  }

  @Post('message')
  sendMessage(@Body() createNotificationDto: CreateNotificationDto) {
      return this.notificationService.sendMessage(createNotificationDto);
  }

  @Post('messageRT')
  sendMessageRT(@Body() createNotificationDto: CreateNotificationDto) {
      return this.notificationService.sendMessageRT(createNotificationDto);
  }
}
