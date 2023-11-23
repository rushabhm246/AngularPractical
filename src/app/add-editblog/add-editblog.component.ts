import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../blogs.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-editblog',
  templateUrl: './add-editblog.component.html',
  styleUrls: ['./add-editblog.component.css']
})
export class AddEditblogComponent implements OnInit {

  blogForm: FormGroup = new FormGroup([])
  id!: number
  blogData: any
  constructor(private _fb: FormBuilder,
    private blogService: BlogsService, private router: ActivatedRoute,
    private _snackbar: MatSnackBar) { }


  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      this.id = param['id'];
      this.getBlogById();

    })

    this.blogForm = this._fb.group({
      title: ['', [Validators.required, Validators.max(255)]],
      description: ['', [Validators.required, Validators.max(65535)]],
      tags: this._fb.array([])
    })


  }

  get tagControlls() {
    return (this.blogForm.get('tags') as FormArray).controls
  }

  addTag() {
    const tagArray = this.blogForm.get('tags') as FormArray;
    tagArray.push(this._fb.control([], Validators.required));
  }

  removeTag(index: number) {
    const tagArray = this.blogForm.get('tags') as FormArray;
    tagArray.removeAt(index);
  }

  onSubmit() {
    if (this.blogForm.valid) {
      if (this.id) {
        this.blogService.editBlog(this.id, this.blogForm.value).subscribe((response) => {
          if (response) this._snackbar.open("Edited Successfully", 'Ok', {
            duration: 3000,
            verticalPosition: 'bottom',
          })
        })
        return
      }
      this.blogService.addBlog(this.blogForm.value).subscribe({
        next: (val: any) => {
          if (val) {
            this._snackbar.open("Edited Successfully", 'Ok', {
              duration: 3000,
              verticalPosition: 'bottom',
            })
          }
          this.blogForm.reset();
        }
      })
    }
  }

  getBlogById() {
    this.blogService.getBlogById(this.id).subscribe((data) => {
      if (data) {
        this.blogData = data
        console.log(this.blogData)
        this.patchFormValues();
      }
    })

  }

  get tagFormArray(){
    return this.blogForm.get('tags') as FormArray
  }

  patchFormValues() {
    console.log(this.blogData)
    this.blogForm.patchValue({
      title: [this.blogData.title],
      description: [this.blogData.description],
    });
    (this.blogData.tags as []).forEach((data) => this.addTag())
    this.tagFormArray.patchValue(this.blogData.tags);
  }
}

