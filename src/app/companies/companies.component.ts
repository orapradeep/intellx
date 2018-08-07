import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  @ViewChild('timeline_chart_Div') timeline_chart_Div: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    google.charts.load('current', { 'packages': ['timeline'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var dataTable = new google.visualization.DataTable();

      dataTable.addColumn({ type: 'string', id: 'Term' });
      dataTable.addColumn({ type: 'string', id: 'Name' });
      dataTable.addColumn({ type: 'date', id: 'Start' });
      dataTable.addColumn({ type: 'date', id: 'End' });

      dataTable.addRows([
        ['1', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ['2', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
        ['3', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)]]);


      var options = {
        timeline: { showRowLabels: false }
      };

      var chart = new google.visualization.Timeline(document.getElementById('timeline_chart_Div'));
      // var chart = new google.visualization.PieChart(this.piechartDiv.naviteElement);

      chart.draw(dataTable, options);
    } // End of function

  }



  onResize(event) {
    console.log("Timeline Resize : " + event.target.innerWidth);
  }



}
