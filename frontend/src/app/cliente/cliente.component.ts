import { HashLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services/user.service'

import {User} from '../core/model/User'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private userSer : UserService) { }

  users : User [];

  ngOnInit(): void {
      this.userSer.getUser().subscribe(resp =>{
        this.users = resp
      })
  }

}
