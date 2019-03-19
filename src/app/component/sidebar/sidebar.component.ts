import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {getAllItems, NavItem} from '../../define/nav-item';
import {fromEvent} from 'rxjs';
import {NavService} from '../../service/nav.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {


  filteredNavItems: NavItem[] = [];

  @ViewChild('sidebarFilter') filter: ElementRef;

  constructor(
    public navService: NavService,
    public router: Router
  ) {
    this.filteredNavItems = this.navService.navItems;
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        const needle = this.filter.nativeElement.value.trim().toLowerCase();

        if (needle === '') {
          this.filteredNavItems = this.navService.navItems;
          return;
        }

        const allItems: NavItem[] = [];

        this.navService.navItems.forEach((item) => {
          allItems.push(...getAllItems(item));
        });


        this.filteredNavItems = allItems.filter((item: NavItem) => {
          return ((item.displayName.toLowerCase().indexOf(needle) !== -1) || (item.route.toLowerCase().indexOf(needle)) !== -1);
        });

      });
  }

  ngOnInit() {
    this.initFilter();
  }

  ngAfterViewInit() {
    // this.navService.currentUrl.next(this.router.url);
  }

}
