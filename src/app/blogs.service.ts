import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  api="http://localhost:3000/blogs";

  constructor(private http:HttpClient) { }

  getBlogs(){
    return this.http.get(this.api)
  }

  getBlogById(id:any){
    return this.http.get(this.api+"/"+id)
  }

  addBlog(data:any){
    console.log(data)
    return this.http.post(this.api,data)
  }

  editBlog(id:number,data:any){
    return this.http.put(this.api+'/'+id,data)
  }

  deleteBlogs(id:number){
    return this.http.delete(this.api+'/'+id)
  }
}
