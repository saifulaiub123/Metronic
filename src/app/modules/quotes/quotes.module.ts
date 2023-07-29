import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuoteComponent } from './quote/quote.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from 'src/app/_metronic/layout';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CoreModule } from 'src/app/core/core.module';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { QuoteDetailsComponent } from './modal/quote-details/quote-details.component';


@NgModule({
  declarations: [
    QuotesListComponent,
    QuoteComponent,
    EditQuoteComponent,
    QuoteDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuotesRoutingModule,
    WidgetsModule,
    SharedModule,
    LayoutModule,
    InlineSVGModule,
    CoreModule
  ]
})
export class QuotesModule { }
