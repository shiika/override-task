import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/shared/post.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-control',
  templateUrl: './post-control.component.html',
  styleUrls: ['./post-control.component.scss']
})
export class PostControlComponent implements OnInit {
  isEdit: boolean = false;
  postId: string;
  postForm: FormGroup;
  userId: number;
  @Output() postUpdated: EventEmitter<{ title: string; body: string; userId: number; id: number }> = new EventEmitter<{ title: string; body: string; userId: number; id: number }>();

  constructor(
    private dataService: DataService, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isEdit = !!this.route.snapshot.params["id"];
    this.postForm = new FormGroup({
      postTitle: new FormControl(null, Validators.required),
      postBody: new FormControl(null, Validators.required)
    });

    if (this.isEdit) {
      const posts = this.dataService.userPosts;
      this.postId = this.route.snapshot.params["id"];
      const updatingPost = posts[+this.postId - 1];
      this.postForm = new FormGroup({
        postTitle: new FormControl(updatingPost.title, Validators.required),
        postBody: new FormControl(updatingPost.body, Validators.required)
      });

      document.body.scrollTop = 10;
    }
  }

  onSubmit() {

    if (this.isEdit) {
      const { postTitle: title, postBody: body } = this.postForm.value;
      const userId = this.authService.userId;
      this.dataService.updatePost({ title, body, userId, id: 101 });
      this.postUpdated.emit({ title, body, userId, id: +this.postId });
      this.postForm.reset();
    } else {
      const { postTitle: title, postBody: body } = this.postForm.value;
      const userId = this.authService.userId;
      
      this.dataService.createPost({ title, body, userId, id: 101 });
      this.postForm.reset();
    }
    
  }

}
