import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  { path: "", component: HeaderComponent},
  { path: "landing", loadChildren: () => import("./landing/landing.module").then(m => m.LandingModule) },
  { path: "panel", loadChildren: () => import("./panel/panel.module").then(m => m.PanelModule) },
  { path: "login", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
