import { Component, OnInit, inject } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { CommonModule } from '@angular/common';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [CommonModule,SearchBoxComponent, CountryTableComponent, LoadingComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {

  private countriesService = inject(CountriesService);

  public isLoading: boolean = false;
  public countries: Country[] = [];
  public initialValue: string = "";
  ngOnInit(): void {
    this.countries = this.countriesService.cashStore.byCapital.countries;
    this.initialValue = this.countriesService.cashStore.byCapital.term;
  }


  searchByCapital(term: string) {
    this.isLoading = true;
    this.countriesService.searchByCapital(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
