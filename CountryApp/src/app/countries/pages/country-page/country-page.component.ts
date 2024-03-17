import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  private activatedRoute = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);
  private router = inject(Router);

  public country?: Country;

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe(country => {
      if(!country){
        return this.router.navigateByUrl('/');
      }
      return this.country = country;
    });

     
  }

  


}
