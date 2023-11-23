import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditblogComponent } from '../add-editblog/add-editblog.component';
import { Router } from '@angular/router';
import { Blog } from '../blogs';
import { BlogsService } from '../blogs.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{

  @ViewChild('deleteDialog',{static:true})
  deletedialog!: ElementRef<HTMLInputElement>;

    blogList:Blog[] = []

  constructor(private _dialog:MatDialog,
    private route:Router,
    private blogService:BlogsService){}

  ngOnInit(): void {
   this.getBlogs()
  }

  getBlogs(){
    this.blogService.getBlogs().subscribe({
      next:(blogs:any)=>{
        if(blogs && blogs.length > 0){
          this.blogList = blogs
        }
      }
     })
  }

  openDialog(){
    this.route.navigate(['/add'])
  }

  deleteDialog(id:number){
    let dialog_ref = this._dialog.open(DeleteModalComponent,{
      data: id,
    })

    dialog_ref.afterClosed().subscribe((res)=>{
      if(res) this.getBlogs()
    })
  }

  onEdit(id:any){
    this.route.navigate(['edit',id])
  }


}
