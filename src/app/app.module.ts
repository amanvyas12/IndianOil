import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {jsPDF} from 'jspdf';
import { MatTableExporterModule } from 'mat-table-exporter';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { OwnerComponent } from './customer/owner/owner.component';
import { OwnerService } from './shared/owner.service';
import { environment } from '../environments/environment';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';

@NgModule({
  declarations: [ 
    AppComponent,
    CustomerComponent,
    OwnerComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    MatTableExporterModule,
    // jsPDF
  ],
  providers: [
    OwnerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [OwnerComponent]
})
export class AppModule { }
