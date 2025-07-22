import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationModule } from './notification/notification.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'MySecr3tPassWord@as2',
      database: process.env.DB_NAME || 'PokemonBD',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    FirebaseModule,
    CommonModule,
    NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
