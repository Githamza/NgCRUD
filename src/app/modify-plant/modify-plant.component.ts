import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modify-plant',
  templateUrl: './modify-plant.component.html',
  styleUrls: ['./modify-plant.component.scss']
})
export class ModifyPlantComponent implements OnInit {
  plantForm: FormGroup
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<ModifyPlantComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.plantForm = new FormGroup({
      id: new FormControl(data[0].id),
      name: new FormControl(data[0]?.name),
      type: new FormControl(data[0]?.type),
      state: new FormControl(data[1] === "edit" ? data[0]?.state : "Planted"),
      desc: new FormControl(data[0]?.desc),
      mise_a_jour: new FormControl(data[0]?.mise_a_jour)

    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
