import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { UsuarioPage } from '../pages/usuario/usuario';
import { WelcomePage } from '../pages/welcome/welcome';
import { PreencherPage } from '../pages/preencher/preencher';
// imports do firebase angular fire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// imports do realtime firebase
import { AngularFireDatabaseModule, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from '../providers/firebase/firebase';


// imports das pages e Geolocation, Camera e Social Sharing
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword'
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { InfoPage } from '../pages/info/info';
import { FotoSocialPage } from '../pages/foto-social/foto-social';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from "@ionic-native/camera";
import { SocialSharing } from '@ionic-native/social-sharing';
// aplicando a chave web do firebase AQUI

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxXXXX",
  databaseURL: "XXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXX"

}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    WelcomePage,
    UsuarioPage,
    PreencherPage,
    InfoPage,
    FotoSocialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    WelcomePage,
    UsuarioPage,
    PreencherPage,
    InfoPage,
    FotoSocialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Geolocation,
    FirebaseProvider,
    Camera,
    SocialSharing
  ]
})
export class AppModule { }

