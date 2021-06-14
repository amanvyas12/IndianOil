import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../shared/owner.service';
import { NotificationService } from '../../shared/notification.service';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  constructor(public service: OwnerService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<OwnerComponent>) { }

  ngOnInit() {
    this.service.getCustomer();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();

  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
      this.service.insertCustomer(this.service.form.value);
    }
      else{
        this.service.updateCustomer(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Successfully');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
