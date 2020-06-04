import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/post.interface';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  $getPosts: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.$getPosts = this.dataService.getAllPosts()
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      )
  }

  ngOnDestroy(): void {
    this.$getPosts.unsubscribe();
  }

}
