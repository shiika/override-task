import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { PostsComponent } from './posts/posts.component';



@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  declarations: [PostsComponent]
})
export class LandingModule { }
