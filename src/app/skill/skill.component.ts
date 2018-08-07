import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @ViewChild('piechartDiv') piechartDiv: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = google.visualization.arrayToDataTable([
        ['Skills', 'Rating'],
        ['ObjC, Swift', 11],
        ['Ionic 2', 7],
        ['Python', 4],
        ['JavaScript', 4],
        ['PHP, MySQL', 3],
        ['Angular 2', 2],
        ['NodeJS', 2],
        ['Tensorflow', 3],
        ['Keras', 4],
        ['Scikit-Learn', 4],
        ['OpenCV', 4],
        ['Chatbot', 2]
      ]);

      var options = {
        'title': 'Technical Skills',
        is3D: true,
        'chartArea': { 'width': '80%', 'height': '80%' },
        'width': '100%',
        'height': 430
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      // var chart = new google.visualization.PieChart(this.piechartDiv.naviteElement);

      chart.draw(data, options);
    } // End of function



    if (window.addEventListener) {
      window.addEventListener('resize', function () {
        drawChart();
      });
    }


  }


  onResize(event) {
    console.log("Resize : " + event.target.innerWidth);
  }


}
