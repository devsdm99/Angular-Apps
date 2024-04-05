import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  link: string;
}

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
})

export class NavBarComponent {
  public menuItems: MenuItem[] = [
    {
      title: 'Segunda mano',
      link: '/used-cars'
    },
    {
      title: 'Nuevos',
      link: '/new-cars'
    },
    {
      title: 'KM 0',
      link: '/km-0'
    }
  ]
}
