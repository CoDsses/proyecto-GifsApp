import { Gif } from './../../interfaces/gifs.interfaces';
import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-home-pages',
  templateUrl: './home-page.component.html',

})
export class HomePageComponent {

  constructor(private gifsService: GifsService){}

  get gifs(): Gif[]{
  return this.gifsService.gifList;
  }
}
