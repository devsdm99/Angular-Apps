import { Component, OnInit, inject } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [CommonModule,SearchBoxComponent, CountryTableComponent, LoadingComponent],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{


  private countriesService = inject(CountriesService);
  public isLoading: boolean = false;

  public selectedRegion?: Region
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public countries: Country[] = [];

  ngOnInit(): void {
    this.countries = this.countriesService.cashStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cashStore.byRegion.region;
  }

  searchByRegion(term: Region) {
    this.isLoading = true;
    this.selectedRegion = term;
    this.countriesService.searchByRegion(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
