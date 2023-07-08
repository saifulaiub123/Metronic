import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    HeaderMenuComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HeaderComponent,
    HeaderMenuComponent,
    NavBarComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
