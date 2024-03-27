import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [] ;
  public heroService: HeroService = inject(HeroService);


  ngOnInit(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
