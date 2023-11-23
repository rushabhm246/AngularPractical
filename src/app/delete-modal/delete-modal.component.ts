import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  constructor(private dialog_ref: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blogService: BlogsService) {
  }

  ngOnInit() {

  }

  onCancel() {
    this.dialog_ref.close()
  }

  onDelete() {
    this.blogService.deleteBlogs(this.data).subscribe((res) => {
      if (res) this.dialog_ref.close(true)
    }

    )

  }
}
