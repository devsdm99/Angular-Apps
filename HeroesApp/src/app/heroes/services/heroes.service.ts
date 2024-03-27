import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { Observable, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import {catchError, delay, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseUrl: string = environments.baseUrl;

  private httpClient: HttpClient = inject(HttpClient);
  constructor() {


  }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((error) => {
        return of(undefined);
      })
    );
  }

  public getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if(!hero.id) throw new Error('Hero id is required');
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((error) => {
        return of(false);
      }),
      map(resp => true)
    );
  }
}