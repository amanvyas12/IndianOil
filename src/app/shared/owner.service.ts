import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private firebase: AngularFireDatabase) { }

  customerList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    city: new FormControl(''),
    date: new FormControl('', Validators.required),
    paymentMode: new FormControl('', Validators.required),
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      fullName: '',
      mobile: '',
      city: '',
      date: '',
      paymentMode: '',
    })
  }


  getCustomer() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  insertCustomer(customer){
    this.customerList.push({
      fullName: customer.fullName,
      mobile: customer.mobile,
      city: customer.city,
      date: customer.date.toJSON().slice(0, 10),
      paymentMode: customer.paymentMode,
    });
  }

  updateCustomer(customer){
    this.customerList.update(customer.$key,
      {
        fullName: customer.fullName,
        mobile: customer.mobile,
        city: customer.city,
        date: customer.date,
        paymentMode: customer.paymentMode,
      });
  }

  deleteCustomer($key: string){
    this.customerList.remove($key);
  }

  populateForm(customer){
    this.form.setValue(customer);
  }
}
