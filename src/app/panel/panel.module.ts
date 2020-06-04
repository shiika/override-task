import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostControlComponent } from './post-control/post-control.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AllPostsComponent, PostControlComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ReactiveFormsModule
  ]
})
export class PanelModule { }
