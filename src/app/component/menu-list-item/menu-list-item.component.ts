import {Component, HostBinding, Input, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavItem} from '../../define/nav-item';
import {NavService} from '../../service/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public navService: NavService,
              public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  updateState(url) {
    if (this.item.route && url) {
      // console.log(`Checking '${this.item.route}' against '${url}'`);
      this.expanded = url.indexOf(`${this.item.route}`) === 0 && (this.item.children !== undefined && this.item.children.length > 0);
      this.ariaExpanded = this.expanded;
      // console.log(`${this.item.route} is expanded: ${this.expanded}`);
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      this.updateState(url);
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
