import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwnerService } from '../../shared/owner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { OwnerComponent } from '../owner/owner.component';
import { NotificationService } from '../../shared/notification.service';
import {jsPDF} from 'jspdf';





@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private service: OwnerService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','mobile','city','date','paymentMode','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  @ViewChild('content') content:ElementRef;
  ngOnInit(): void {
    this.service.getCustomer().subscribe(
      list => {
        let array = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }


  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus =true;
    // dialogConfig.width = "100%";
    this.dialog.open(OwnerComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus =true;
    // dialogConfig.width = "100%";
    this.dialog.open(OwnerComponent, dialogConfig);
  }

  onDelete($key){
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCustomer($key);
      this.notificationService.warn('Deleted Successfully');
    }
  }

// pdf view
      public SavePDF(){
        let content=this.content.nativeElement;
        let doc = new jsPDF();
        let _elementHandlers =
        {
          '#editor':function(element,renderer){
            return true;
          }
        };
        doc.autoPrint;
        doc.save('test.pdf');
      }
}
