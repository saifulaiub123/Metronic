import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationToBeSentRoutingModule } from './application-to-be-sent-routing.module';
import { ListComponent } from './list/list.component';


// import { QuoteComponent } from './quote/quote.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from 'src/app/_metronic/layout';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CoreModule } from 'src/app/core/core.module';
// import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/_metronic/partials';
// import { QuoteDetailsModalComponent } from './modal/quote-details/quote-details.component';
import { ChangeStatusModalComponent } from './modal/change-status-modal/change-status-modal.component';

@NgModule({
  declarations: [
    ListComponent,
    ChangeStatusModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ApplicationToBeSentRoutingModule,
    WidgetsModule,
    SharedModule,
    LayoutModule,
    InlineSVGModule,
    CoreModule,
    FormsModule
    
  ]
})
export class ApplicationToBeSentModule { }
