import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MemorixComponent } from './experience/memorix/memorix.component';
import { OvniprojectComponent } from './experience/ovniproject/ovniproject.component';
import { OboutiqueprojectComponent } from './experience/oboutiqueproject/oboutiqueproject.component';
import { ResumeComponent } from './resume/resume.component';
import { DanonComponent } from './experience/danon/danon.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { ValuerComponent } from './experience/valuer/valuer.component';
import { TumbleComponent } from './experience/tumble/tumble.component';
import { YachtComponent } from './experience/yacht/yacht.component';
import { BomaeComponent } from './experience/bomae/bomae.component';
import { ItshanaawadComponent } from './experience/itshanaawad/itshanaawad.component';
import { ArchitectureportfolioComponent } from './experience/architectureportfolio/architectureportfolio.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'Memorix', component: MemorixComponent},
  {path: 'Ovni', component: OvniprojectComponent},
  {path: 'OBoutique', component: OboutiqueprojectComponent},
  {path: 'Resume', component: ResumeComponent},
  {path: 'Danon', component: DanonComponent},
  {path: 'Hobbies', component: HobbiesComponent},
  {path: 'Valuer', component: ValuerComponent},
  {path: 'Tumble', component: TumbleComponent},
  {path: 'Yacht', component: YachtComponent},
  {path: 'Bomae', component: BomaeComponent},
  {path: 'itshanaawad', component: ItshanaawadComponent},
  {path: 'ArchitecturePortfolio', component: ArchitectureportfolioComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
