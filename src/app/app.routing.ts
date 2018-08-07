import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

const routes: Routes = [
  { path: 'profile', component: HomeComponent },
  // { path: 'user', component: UserComponent },
  // { path: 'table',          component: TablesComponent },
  // { path: 'typography',     component: TypographyComponent },
  { path: 'mobile_apps', component: TablesComponent },
  { path: 'electronics', component: NotificationsComponent },
  { path: 'machine_learning', component: TypographyComponent },
  { path: 'certifications', component: UserComponent },

  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  // { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  // { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
  { path: '**', redirectTo: '/profile', pathMatch: 'full' }

  // { path: '**', redirectTo: '/dashboard' }

  // {path: '**', redirectTo: '/welcome'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
    // RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
