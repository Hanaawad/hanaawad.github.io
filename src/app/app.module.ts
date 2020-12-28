import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerlandingComponent } from './bannerlanding/bannerlanding.component';
import { ExperienceComponent } from './experience/experience.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemorixComponent } from './experience/memorix/memorix.component';
import { OvniprojectComponent } from './experience/ovniproject/ovniproject.component';
import { OboutiqueprojectComponent } from './experience/oboutiqueproject/oboutiqueproject.component';
import { ResumeComponent } from './resume/resume.component';
import { DanonComponent } from './experience/danon/danon.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { HobbiesdataComponent } from './hobbies/hobbiesdata/hobbiesdata.component';
import { ValuerComponent } from './experience/valuer/valuer.component';
import { TumbleComponent } from './experience/tumble/tumble.component';
import { YachtComponent } from './experience/yacht/yacht.component';
import { BomaeComponent } from './experience/bomae/bomae.component';
import { ItshanaawadComponent } from './experience/itshanaawad/itshanaawad.component';
import { ArchitectureportfolioComponent } from './experience/architectureportfolio/architectureportfolio.component';
import { NavlandingComponent } from './navlanding/navlanding.component';
import { ContactmeComponent } from './contactme/contactme.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    BannerlandingComponent,
    ExperienceComponent,
    MemorixComponent,
    OvniprojectComponent,
    OboutiqueprojectComponent,
    ResumeComponent,
    DanonComponent,
    HobbiesComponent,
    HobbiesdataComponent,
    ValuerComponent,
    TumbleComponent,
    YachtComponent,
    BomaeComponent,
    ItshanaawadComponent,
    ArchitectureportfolioComponent,
    NavlandingComponent,
    ContactmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
