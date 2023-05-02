import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../shared/service/firebase.service";
import {Blog} from "../../shared/model/blog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  tesztBlog: Blog = {
    title: "most verd ki",
    description: "vv ancsá1nak nagyobb lett a csöcse",
    content: "bigYike",
    id: ""
  }
  blogForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  })

  blogs: Observable<Blog[]>;

  constructor(private fbService: FirebaseService) {
    this.blogs = fbService.getBlogs();
  }

  ngOnInit(): void {

  }
  addBlog(): void {
    this.tesztBlog.title = this.blogForm.controls["title"].value;
    this.tesztBlog.description = this.blogForm.controls["description"].value;
    this.tesztBlog.content = this.blogForm.controls["content"].value;
    this.fbService.add("Blogs", this.tesztBlog);
  }

  update(blog: Blog, blogId: string): void {
    console.log(blog)
    this.fbService.update("Blogs", blogId, blog);
  }

  delete(blogId: string): void {
    this.fbService.delete("Blogs", blogId)
  }
}
