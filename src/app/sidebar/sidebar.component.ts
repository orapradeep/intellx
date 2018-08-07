import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: 'dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: 'profile', title: 'My Profile', icon: 'pe-7s-user', class: '' },
    // { path: 'user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
    // { path: 'mobile_apps', title: 'Mobile Apps', icon: 'pe-7s-phone', class: '' },
    { path: 'electronics', title: 'Electronics', icon: 'pe-7s-tools', class: '' },
    { path: 'machine_learning', title: 'Machine Learning', icon: 'pe-7s-science', class: '' },
    { path: 'certifications', title: 'Certifications', icon: 'pe-7s-notebook', class: '' },

    // { path: 'typography', title: 'Typography', icon: 'pe-7s-news-paper', class: '' },
    // { path: 'icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
    { path: 'maps', title: 'My Location', icon: 'pe-7s-map-marker', class: '' },
    // { path: 'notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private data: DataService) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.updateTitle(this.menuItems[0].title);
    }

    updateTitle(title) {
        // console.log("Title clicked : " + title);
        this.data.changeMessage(title);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
