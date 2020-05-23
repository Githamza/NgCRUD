import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlante } from '../shared/interfaces/Iplante';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ModifyPlantComponent } from '../modify-plant/modify-plant.component';
import { MatSelectChange } from '@angular/material/select';
import { PlantsListService } from './plants-list.service';
import * as moment from 'moment'

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})

export class PlantsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'state', 'date', 'type', 'desc', 'select'];
  dataSource = new MatTableDataSource<IPlante>([]);
  selection = new SelectionModel<IPlante>(true, []);
  constructor(public dialog: MatDialog, private plantsListService: PlantsListService) { }
  filterChanged(event: MatSelectChange) {
    const filterValue = event.value;
    if (event.value.length > 0)
      this.plantsListService.filterPlants(event.value).subscribe(data => {
        this.dataSource.data = data;
        this.paginator._changePageSize(this.paginator.pageSize);
      })
    else this.plantsListService.getAllPlants().subscribe(data => {
      this.dataSource.data = data;
      this.paginator._changePageSize(this.paginator.pageSize);
    })
  }
  applyFilterbyId(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: IPlante): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }
  deleteItems() {
    this.plantsListService.deletePlants(this.selection.selected).subscribe(data => {
      this.dataSource.data = data;
      this.paginator._changePageSize(this.paginator.pageSize);
      this.selection.clear();

    })

  }
  editItem(row, action) {
    const dialogRef = this.dialog.open(ModifyPlantComponent, {
      width: '250px',
      data: [row, action]
    });
    dialogRef.afterClosed().subscribe((result: IPlante) => {
      if (result) {
        switch (action) {
          case 'edit':
            result = this.updateDateIfStateChanged(row, result)
            this.plantsListService.editPlant(result).subscribe(data => {
              this.dataSource.data = data
              this.paginator._changePageSize(this.paginator.pageSize);

            })
            break;
          case 'add':
            this.plantsListService.addPlant(result).subscribe(data => {
              this.dataSource.data = data
              this.paginator._changePageSize(this.paginator.pageSize);

            })
        }

      }
    });
  }
  updateDateIfStateChanged(prev: IPlante, curr: IPlante) {
    console.log(curr)
    if (prev.state !== curr.state) {
      curr.mise_a_jour = new Date()
      return curr
    }
    else return curr
  }
  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }
  formatDate(date) {
    return moment(date).format('LLLL')
  }
  ngOnInit(): void {

    this.plantsListService.getAllPlants().toPromise().then(data => {
      this.dataSource.data = data
    })
    this.dataSource.paginator = this.paginator;

  }

}
