import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;

    mobileApps_arr = [];


    constructor() { }

    ngOnInit() {


        // this.tableData1 = {
        //     headerRow: ['ID', 'Name', 'Country', 'City', 'Salary'],
        //     dataRows: [
        //         ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        //         ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        //         ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        //         ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        //         ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        //         ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
        //     ]
        // };
        // this.tableData2 = {
        //     headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
        //     dataRows: [
        //         ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
        //         ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
        //         ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
        //         ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
        //         ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten',],
        //         ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester']
        //     ]
        // };

        this.initialiseProjects();


    }


    initialiseProjects() {

        this.mobileApps_arr = [];
        var obj = null;

        //=================== Mobile Apps =========================

        obj = {};
        obj.title = "KLIA Ekspres Mobile App";
        obj.desc = "The ERL Mobile App is a cross platform mobile app used for booking tickets on KLIA Ekspres and KLIA Transit lines which runs between KL Sentral and KLIA, Malaysia";
        obj.link = "https://itunes.apple.com/my/app/klia-ekspres/id618650763?mt=8";
        this.mobileApps_arr.push(obj);

        obj = {};
        obj.title = "iHajj Guide";
        obj.desc = "The iHajj app is an enterprise app developed for the Muslim pilgrims going for performing Hajj & Umrah.";
        obj.link = "https://www.csc-crowddynamics.com/";
        this.mobileApps_arr.push(obj);

        obj = {};
        obj.title = "Singapore Airlines";
        obj.desc = "Mobile app for flight checkin, checking flight status and saving boarding passes on the device.";
        obj.link = "https://itunes.apple.com/us/app/singapore-airlines/id515287841?mt=8";
        this.mobileApps_arr.push(obj);


        obj = {};
        obj.title = "Flight Status for AirAsia";
        obj.desc = "Mobile app for getting the Flight schedule and Flight Status of AirAsia flights.";
        obj.link = "https://itunes.apple.com/my/app/flight-status-for-airasia/id921458833?mt=8";
        this.mobileApps_arr.push(obj);


        obj = {};
        obj.title = "Delhi Hospitals & Blood Bank";
        obj.desc = "The app displays the list of all Govt Hospitals and Blood Banks in Delhi with their address and contact details.";
        obj.link = "https://itunes.apple.com/my/app/delhi-hospitals-blood-bank/id912238664?mt=8";
        this.mobileApps_arr.push(obj);



    }


    openBrowser(url) {
        window.open(url, '_blank');
    }

}
