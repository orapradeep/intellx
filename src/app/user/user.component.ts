import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  cert_arr = [];
  constructor() { }

  ngOnInit() {

    var cert = null;

    cert = {};
    cert.image = "assets/img/certifications/Coursera 88VRCHJFCV9K.jpg";
    cert.name = "Coursera - Machine Learning";
    this.cert_arr.push(cert);


    cert = {};
    cert.image = "assets/img/certifications/Coursera FD87BZGUUYZZ.jpg";
    cert.name = "Coursera - Neural Networks and Deep Learning";
    this.cert_arr.push(cert);



  }


}
