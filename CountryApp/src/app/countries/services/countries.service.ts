
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private _baseUrl: string = `https://restcountries.com/v3.1`;
    private _httpClient = inject(HttpClient);


    public cashStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
        byCountry: { term: '', countries: [] }
    };
        
    constructor() {
        this.getFromLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cashStore));
    }

    private getFromLocalStorage() {
        if(!localStorage.getItem('cacheStore')){
            return; 
        }
        this.cashStore = JSON.parse(localStorage.getItem('cacheStore') || '{}');
    }

    private getCountriesRequest(url: string): Observable<Country[]> {
        return this._httpClient.get<Country[]>(url)
            .pipe(
                catchError(() => of([])),
            );
    }

    public searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
        let url = `${this._baseUrl}/alpha/${alphaCode}`;
        return this._httpClient.get<Country[]>(url).pipe(
            map((countries) => countries.length > 0 ? countries[0] : null),
            catchError(() => of(null))
        );
    }

    public searchByCapital(term: string): Observable<Country[]> {
        let url = `${this._baseUrl}/capital/${term}`;
        return this.getCountriesRequest(url).pipe(
            tap((countries) => {
                this.cashStore.byCapital = { term, countries };
            }),
            tap(() => {
                this.saveToLocalStorage();
            })
        
        );

    }

    public searchByRegion(term: Region): Observable<Country[]> {
        let url = `${this._baseUrl}/region/${term}`;
        return this.getCountriesRequest(url).pipe(
            tap((countries) => {
                this.cashStore.byRegion = { region: term, countries };
            }),
            tap(() => {
                this.saveToLocalStorage();
            })
        
        );
    }

    public searchByCountry(term: string): Observable<Country[]> {
        let url = `${this._baseUrl}/name/${term}`;
        return this.getCountriesRequest(url).pipe(
            tap((countries) => {
                this.cashStore.byCountry = { term, countries };
            }),
            tap(() => {
                this.saveToLocalStorage();
            })
        );

    }

}
