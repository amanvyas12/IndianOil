import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service: OwnerService) { }

  ngOnInit(): void {
  }

}
