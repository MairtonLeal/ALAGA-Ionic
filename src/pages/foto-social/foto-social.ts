import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-foto-social',
  templateUrl: 'foto-social.html',
})
export class FotoSocialPage {
  currentPhoto;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public camera: Camera,
    private socialSharing: SocialSharing
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotoSocialPage');
  }

  getPhoto(type) {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {

      this.currentPhoto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });

  }
  facebookShare() {
    this.socialSharing.shareViaFacebook("Olha esse Local ALAGADO ! - via ALAGA-INFO", this.currentPhoto, null).then(() => {
      console.log("shareViaFacebook: Success");
    }).catch(() => {
      console.error("shareViaFacebook: failed");
    });
  }

  instagramShare() {
    this.socialSharing.shareViaInstagram("Olha esse Local ALAGADO ! - via ALAGA-INFO", this.currentPhoto).then(() => {
      console.log("shareViaInstagram: Success");
    }).catch(() => {
      console.error("shareViaInstagram: failed");
    });
  }
  whatsappShare() {
    this.socialSharing.shareViaWhatsApp("Olha esse Local ALAGADO ! - via ALAGA-INFO", this.currentPhoto, null).then(() => {
      console.log("shareViaWhatsApp: Success");
    }).catch(() => {
      console.error("shareViaWhatsApp: failed");
    });
  }
  twitterShare() {
    this.socialSharing.shareViaTwitter("Olha esse Local ALAGADO ! - via ALAGA-INFO", this.currentPhoto, null).then(() => {
      console.log("shareViaTwitter: Success");
    }).catch(() => {
      console.error("shareViaTwitter: failed");
    });
  }


}
