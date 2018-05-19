import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth-service/user';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { UsuarioPage } from '../usuario/usuario';
import { InfoPage } from '../info/info';



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    public alertCtrl: AlertController
  ) {

  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          this.navCtrl.setRoot(UsuarioPage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }
  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uso de Autenticação Necessária',
      subTitle: 'Olá Colaborador, A restrição para acesso, está em maiores serviços que assim que possivel estarão disponiveis neste aplicativo, Agradecemos seu Cadastro e Acesso. ALAGA-INFO APP',
      
      buttons: ['OK Entendi!']
    });
    alert.present();
  }
  sobreAPP() {
    this.navCtrl.push(InfoPage);
  }

}
