import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({"projectId":"contacts-yt-82abe","appId":"1:2430367964:web:025fd02c3b4a9b934b9c19","storageBucket":"contacts-yt-82abe.firebasestorage.app","apiKey":"AIzaSyDw0ZWJgZql7i9iROK--8UTMoVyDCGS6-Q","authDomain":"contacts-yt-82abe.firebaseapp.com","messagingSenderId":"2430367964"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
