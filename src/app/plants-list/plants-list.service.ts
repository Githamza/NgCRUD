import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { IPlante } from '../shared/interfaces/Iplante';
@Injectable({
  providedIn: 'root'
})
export class PlantsListService {

  constructor(private httpClientService: HttpClient) { }
  baseUrl = `http://localhost:3000`
  addPlant(row: IPlante) {
    return this.httpClientService.post<IPlante[]>(`${this.baseUrl}/add`, row)
  }
  filterPlants(type: string) {
    return this.httpClientService.get<IPlante[]>(`${this.baseUrl}/filter/?type=${type}`)
  }
  editPlant(row: IPlante) {
    return this.httpClientService.post<IPlante[]>(`${this.baseUrl}/edit`, row)
  }
  deletePlants(rows: IPlante[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: rows
    }
    return this.httpClientService.delete<IPlante[]>(`${this.baseUrl}`, options)
  }
  getAllPlants() {
    return this.httpClientService.get<IPlante[]>(`${this.baseUrl}/all`)
  }

}
