import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/post.interface';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/auth/auth.service';
import { concatMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  $postsSub: Subscription;
  $userPostsSub: Subscription;

  constructor(private dataService: DataService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.authService.userId;
    this.$userPostsSub = this.dataService.getUserPosts(userId)
      .subscribe(
      (postsArr: Post[]) => {
        this.posts = postsArr;
        this.dataService.$userPosts.subscribe(posts => { this.posts = posts; })
      }
    );

      // this.dataService.$addPost.subscribe(
      //   post => {
      //     if (post) {
      //       this.posts.filter((item, i) => {
      //         return item.id != post.id
      //       });
      //       // this.posts.push(post);
      //     }
      //   }
      // )

    this.route.params.subscribe(
      params => {
        console.log(params["id"]);
      }
    )
  }

  updatePosts(post: Post) {
    this.posts = this.posts.filter((item, i) => {
      return item.id != post.id
    });
    this.posts[post.id - 1] = post;
  }

  onDeletePost(id: number) {
    this.dataService.deletePost(id);
  }

  ngOnDestroy(): void {
    this.$userPostsSub.unsubscribe();
  }

}
