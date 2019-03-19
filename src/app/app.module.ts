import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotFoundPageComponent} from './component/not-found-page/not-found-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {MainLayoutComponent} from './component/main-layout/main-layout.component';
import {NavBarComponent} from './component/nav-bar/nav-bar.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './service/api.service';
import {CommonService} from './service/common.service';
import {AuthGuardService} from './service/auth-guard.service';
import {MaterialModule} from './module/material.module';
import {MenuListItemComponent} from './component/menu-list-item/menu-list-item.component';
import {NavService} from './service/nav.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {getSpanishPaginatorIntl} from './intl/spanish-paginator-intl';
import {MatPaginatorIntl} from '@angular/material';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './module/auth.module#AuthModule'
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    loadChildren: './module/main.module#MainModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    MainLayoutComponent,
    NavBarComponent,
    SidebarComponent,
    MenuListItemComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

    FlexLayoutModule,

    MaterialModule,

    PerfectScrollbarModule,

    ToastrModule.forRoot({
      enableHtml: true
    }),
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        // enableTracing: true
      }
    )
  ],
  exports: [],
  providers: [
    ApiService,
    CommonService,
    NavService,
    AuthGuardService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: {
        suppressScrollX: true
      }
    },
    {
      provide: MatPaginatorIntl,
      useValue: getSpanishPaginatorIntl()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
