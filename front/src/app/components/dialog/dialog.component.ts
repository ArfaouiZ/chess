import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  type:string="" //draw offer take back proposal win draw 
  constructor(public dialogRef:MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
    /* this.type=data.type */
    dialogRef.disableClose = true;
  }

  
  onNoClick(choice :string): void {
    this.dialogRef.close(choice);
  }

}
