import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';

@Module({
  controllers: [],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  constructor(){
    let serviceAccount = require("../../dm2-2025-firebase-adminsdk-fbsvc-5b7edcb33d.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://dm2-2025-default-rtdb.firebaseio.com",
    });
  }
}
