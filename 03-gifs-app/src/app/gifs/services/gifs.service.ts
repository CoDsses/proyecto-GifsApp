
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = []
  private apikey: string = '9WdAOueUy51oH72I5N0T65cOOTDrxQmE';
  private serviceUrl: string = 'Http://api.giphy.com/v1/gifs';



  constructor(private Http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{
    if( !localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void { //buscar los valores del tag que la persona está indicando
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', 10)
      .set('q', tag)

    this.Http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        // console.log({gifs: this.gifList });
      })
  }
}
