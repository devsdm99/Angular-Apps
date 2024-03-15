import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, GifsResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagHistory: string[] = [];
  private _apiKey: string = "POogqhFfi28dLGC6d7DKbMPysNMx4Qpe";
  private _apiUrl: string = `https://api.giphy.com/v1/gifs/search`;
  private _httpClient = inject(HttpClient);

  constructor() {
    this.loadLocalStorage();
  }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.trim().toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter(oldTag => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();

  }

  private loadLocalStorage(){
    const localHistory = localStorage.getItem('tagHistory');
    if(localHistory){
      this._tagHistory = JSON.parse(localHistory);
    }
  }
  private saveLocalStorage(){
    localStorage.setItem('tagHistory', JSON.stringify(this._tagHistory));
  }


  public searchTag(tag: string): void {
    if(tag.trim().length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this._apiKey)
    .set('limit', '10')
    .set('q', tag);

    this._httpClient.get<GifsResponse>(`${this._apiUrl}`,{params})
      .subscribe((response) => {
        this.gifsList = response.data;
      });
   
  }

}
