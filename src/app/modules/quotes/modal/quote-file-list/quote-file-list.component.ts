import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as saveAs from 'file-saver';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-quote-file-list',
  templateUrl: './quote-file-list.component.html',
  styleUrls: ['./quote-file-list.component.scss']
})
export class QuoteFileListComponent implements OnInit {
  @Input() selectedSiteIds: any[];
  @Input() selectedQuoteId: any;

  quotes: any[];
  selectedStatus: string = '';
  status: string = '';
  empName: string = "";
  showErrorMsg: boolean = false;
  showErrorMsg1: boolean = false;
  isValid: boolean = true;
  invalidQuote: string = ''
  fileDetails: any = {};

  constructor(public activeModal: NgbActiveModal,
    private quoteService: QuotesService,
    private auth: AuthService,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getFiles();
  }
  getFiles()
  {
    this.quoteService.getFiles(this.selectedQuoteId).subscribe(res=>{
      this.fileDetails = res;
    })
  }

  Download(id: any, fileName: string)
  {
    this.quoteService.downloadFile(this.selectedQuoteId,id,fileName);
  }

}
