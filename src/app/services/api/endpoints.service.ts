import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  constructor() { }
  // public otp = 'validCustomers/';
  public user = 'user/';
  public login = 'auth/local';
  public register = 'auth/local/register';
  public forgotPassword = 'auth/forgot-password';

  public sneakers = 'sneakers';
  public bids = 'bids';
  public orders = `orders`;
  public authorizeOrder = 'orders/authorize';
  public resetPwd = 'auth/local/request-otp';

  public seats = 'seats/';
  public rows = 'seats/rows';

  public upload = 'upload/';
  public me = 'users/me';

  public payments = 'payments';

  public singleBid = (id) => `bids/${id}`;
  public singleUser = (id) => `users/${id}`;
  public bidCancel = (id) => `bids/cancel/${id}`;
}
