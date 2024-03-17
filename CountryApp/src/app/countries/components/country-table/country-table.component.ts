import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'countries-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {


  @Input() countries: Country[] = [];

  @Output() onViewMore = new EventEmitter<Country>();


  viewMore(country: Country) {
    this.onViewMore.emit(country);
  }



}
