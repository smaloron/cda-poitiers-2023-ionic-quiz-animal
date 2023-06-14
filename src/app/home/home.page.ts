import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animals = [
    {
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];

  // L'index de l'animal dont on a entendu le cri
  pickedAnimalIndex: number | null = null;

  // l'instance chargée de jouer le son
  media: HTMLAudioElement | null = null;

  tries = 0;

  constructor(private toastCtrl: ToastController) { }

  play() {

    if (this.animals.length === 0) {
      window.location.href = window.location.href;
      return;
    }

    // choix aléatoire d'un animal
    if (this.pickedAnimalIndex === null) {
      this.pickedAnimalIndex = Math.floor(Math.random() * this.animals.length);
    }
    const animal = this.animals[this.pickedAnimalIndex];


    if (this.media && this.media.currentTime > 0) {
      this.media.pause();
    }

    // lecture du cri de l'animal
    this.media = new Audio('/assets' + animal.file);
    this.media.load();
    this.media.play();
  }

  guess(animal: string) {
    let message: string = "Mauvais choix";

    this.tries++;

    if (this.pickedAnimalIndex === null) {
      message = "Il faut cliquer sur \"jouer un son\" avant de choisir un animal";
    } else if (animal === this.animals[this.pickedAnimalIndex].title) {
      message = `Bravo c'est gagné en ${this.tries} tentative(s)`;

      // Suppression de l'animal dont on vient de deviner le cri
      this.animals.splice(this.pickedAnimalIndex, 1);

      this.pickedAnimalIndex = null;
      this.media = null;
      this.tries = 0;
    }

    this.showMessage(message);
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "middle"
    });

    toast.present();
  }

  getPlayButtonLabel(): string {
    if (this.animals.length === 0)
      return 'Relancer le jeu';

    if (this.pickedAnimalIndex !== null)
      return 'cliquer sur un animal';

    return 'Jouer un son';
  }

}
