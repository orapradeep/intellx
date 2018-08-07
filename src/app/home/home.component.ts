import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { SkillComponent } from '../skill/skill.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public emailChartType: ChartType;
  // public emailChartData: any;
  // public emailChartLegendItems: LegendItem[];

  // public hoursChartType: ChartType;
  // public hoursChartData: any;
  // public hoursChartOptions: any;
  // public hoursChartResponsive: any[];
  // public hoursChartLegendItems: LegendItem[];

  // public activityChartType: ChartType;
  // public activityChartData: any;
  // public activityChartOptions: any;
  // public activityChartResponsive: any[];
  // public activityChartLegendItems: LegendItem[];

  mobileApps_arr = [];
  machine_learning_projects_arr = [];


  constructor() { }

  ngOnInit() {

    this.initialiseProjects();
  }


  initialiseProjects() {
    this.mobileApps_arr = [];
    this.machine_learning_projects_arr = [];

    var obj = null;

    //=================== Mobile Apps =========================

    obj = {};
    obj.title = "KLIA Ekspres Mobile App";
    obj.desc = "The ERL Mobile App is a cross platform mobile app used for booking tickets on KLIA Ekspres and KLIA Transit lines which runs between KL Sentral and KLIA, Malaysia";
    this.mobileApps_arr.push(obj);

    obj = {};
    obj.title = "iHajj Guide";
    obj.desc = "The iHajj app is an enterprise app developed for the Muslim pilgrims going for performing Hajj & Umrah.";
    this.mobileApps_arr.push(obj);

    obj = {};
    obj.title = "Singapore Airlines";
    obj.desc = "Mobile app for flight checkin, checking flight status and saving boarding passes on the device.";
    this.mobileApps_arr.push(obj);


    obj = {};
    obj.title = "Flight Status for AirAsia";
    obj.desc = "Mobile app for getting the Flight schedule and Flight Status of AirAsia flights.";
    this.mobileApps_arr.push(obj);


    // ================ Machine Learning Apps ========================

    obj = {};
    obj.title = "Object Detection using Tensorflow";
    obj.desc = "Custom object Detection using Tensorflow, OpenCV on MacOS and iOS mobile device.";
    this.machine_learning_projects_arr.push(obj);


    obj = {};
    obj.title = "Intrusion detection on Raspberry Pi";
    obj.desc = "Automated sms's with link to person's pic are sent to a pre-configured mobile number on detecting persons in unauthorized areas.";
    this.machine_learning_projects_arr.push(obj);

    obj = {};
    obj.title = "Face and Emotion detection";
    obj.desc = "Face detection and Emotion detection using Python, OpenCV";
    this.machine_learning_projects_arr.push(obj);


    obj = {};
    obj.title = "Person detection using Drone";
    obj.desc = "Person detection using Syma X5HW drone";
    this.machine_learning_projects_arr.push(obj);

  }


  // createCharts() {
  //   this.emailChartType = ChartType.Pie;
  //   this.emailChartData = {
  //     labels: ['62%', '32%', '6%'],
  //     series: [62, 32, 6]
  //   };
  //   this.emailChartLegendItems = [
  //     { title: 'Open', imageClass: 'fa fa-circle text-info' },
  //     { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
  //     { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
  //   ];

  //   this.hoursChartType = ChartType.Line;
  //   this.hoursChartData = {
  //     labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
  //     series: [
  //       [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
  //       [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
  //       [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
  //     ]
  //   };
  //   this.hoursChartOptions = {
  //     low: 0,
  //     high: 800,
  //     showArea: true,
  //     height: '245px',
  //     axisX: {
  //       showGrid: false,
  //     },
  //     lineSmooth: Chartist.Interpolation.simple({
  //       divisor: 3
  //     }),
  //     showLine: false,
  //     showPoint: false,
  //   };
  //   this.hoursChartResponsive = [
  //     ['screen and (max-width: 640px)', {
  //       axisX: {
  //         labelInterpolationFnc: function (value) {
  //           return value[0];
  //         }
  //       }
  //     }]
  //   ];
  //   this.hoursChartLegendItems = [
  //     { title: 'Open', imageClass: 'fa fa-circle text-info' },
  //     { title: 'Click', imageClass: 'fa fa-circle text-danger' },
  //     { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
  //   ];

  //   this.activityChartType = ChartType.Bar;
  //   this.activityChartData = {
  //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //     series: [
  //       [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
  //       [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
  //     ]
  //   };
  //   this.activityChartOptions = {
  //     seriesBarDistance: 10,
  //     axisX: {
  //       showGrid: false
  //     },
  //     height: '245px'
  //   };
  //   this.activityChartResponsive = [
  //     ['screen and (max-width: 640px)', {
  //       seriesBarDistance: 5,
  //       axisX: {
  //         labelInterpolationFnc: function (value) {
  //           return value[0];
  //         }
  //       }
  //     }]
  //   ];
  //   this.activityChartLegendItems = [
  //     { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
  //     { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
  //   ];


  // }


  openLink(link) {

    var url = "";

    if (link == 'github') {

      url = "https://www.github.com/orapradeep/";

    } else if (link == 'linkedin') {

      url = "https://www.linkedin.com/in/pradeepnaulia";

    } else if (link == 'skype') {

      url = "skype:xchanging.biranchi?call";

    } else if (link == 'whatsapp') {

      url = "https://api.whatsapp.com/send?phone=+601123544169";

    }

    window.open(url, "_blank");

  }


}
