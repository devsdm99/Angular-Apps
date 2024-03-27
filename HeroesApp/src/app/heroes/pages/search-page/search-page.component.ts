import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl('')
  public allHeroes: Hero[] = [];
  public heroes: Hero[] = [];
  public selectedHero: Hero | undefined;

  private heroesService: HeroService = inject(HeroService);

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(heroes => this.allHeroes = heroes);
  }

  searchHero(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      map(value => value?.toUpperCase())
    );
    
    const value: string = this.searchInput.value || '';
    if (value.length === 0) {
      this.heroes = [];
    }
    this.heroes = this.allHeroes.filter(hero => hero.superhero.toLowerCase().includes(value.toLowerCase()));
  }

  onSelected(hero: MatAutocompleteSelectedEvent): void {
    if (!hero.option.value) {
      this.selectedHero = undefined;
    }
    this.selectedHero = hero.option.value;
    this.searchInput.setValue(this.selectedHero?.superhero ?? "");
  }
}
