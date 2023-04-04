/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { GarageInterface, UserInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';
import { GaragesService } from '../garages.service';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'car-net-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css'],
})
export class GaragesComponent implements OnInit{

  garages$: Observable<GarageInterface[]> | undefined;
  user$: Observable<UserInterface> | undefined;
  email: string | null = localStorage.getItem('email');
  constructor(private garagesService: GaragesService, private authService: AuthService) {}

ngOnInit() {
  this.garages$ = this.garagesService.findAll();
  this.user$ = this.garagesService.findOneUser(this.email);
}}
