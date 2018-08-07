import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { DataService } from './data.service';
import { SkillComponent } from './skill/skill.component';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { SafePipe } from './pipes/safe-pipe';
import { HttpClientModule } from '@angular/common/http';
import { BoolToYesNoPipe } from './pipes/bool-to-yes-no/bool-to-yes-no.pipe';
import { AbstractCameraService, cameraFactory } from './services/abstract-camera.service';
import { DesktopCameraService } from './services/desktop-camera.service';
import { FaceRecognitionService } from './services/face-recognition.service';
import { MobileCameraService } from './services/mobile-camera.service';
import { PlatformInformationProvider } from './services/platform-information.provider';
import { CompaniesComponent } from './companies/companies.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    SkillComponent,
    SafePipe,
    BoolToYesNoPipe,
    CompaniesComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    LbdModule,
    HttpClientModule
  ],
  providers: [
    DesktopCameraService,
    MobileCameraService,
    FaceRecognitionService,
    PlatformInformationProvider,
    DataService,
    SafePipe,
    {
      provide: AbstractCameraService,
      useFactory: cameraFactory,
      deps: [PlatformInformationProvider]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
