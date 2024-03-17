import { Component, OnInit, inject } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [SearchBoxComponent, CountryTableComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  private countriesService = inject(CountriesService);

  public countries: Country[] = [];
  public initialValue: string = "";

  ngOnInit(): void {
    this.countries = this.countriesService.cashStore.byCountry.countries;
    this.initialValue = this.countriesService.cashStore.byCountry.term;
  }


  searchByCountry(term: string) {
    this.countriesService.searchByCountry(term).subscribe(countries => {
      this.countries = countries;
    });
  }


}
