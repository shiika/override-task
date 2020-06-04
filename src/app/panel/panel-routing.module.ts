import { Routes, RouterModule } from "@angular/router";
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostControlComponent } from './post-control/post-control.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
    { path: "posts", children: [
        { path: "all", component: AllPostsComponent, canActivate: [AuthGuardService] },
        { path: "all/:id", component: AllPostsComponent, canActivate: [AuthGuardService] },
        { path: "control", component: PostControlComponent, canActivate: [AuthGuardService] }
    ], canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PanelRoutingModule {

}