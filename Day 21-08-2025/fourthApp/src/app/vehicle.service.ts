import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http:HttpClient) { }

 getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>('http://localhost:3000/vehicle');
  }

 getVehicleById(vehicleId: string): Observable<Vehicle> {
  return this.http.get<Vehicle>(`http://localhost:3000/vehicle/${vehicleId}`);
}



  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`http://localhost:3000/vehicle/${vehicle.id}`, vehicle);
  }

  deleteVehicle(vehicleId: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/vehicle/${vehicleId}`);
  }


    saveVehicle(vehicle: Vehicle): Observable<Vehicle> {
    let vehicleSave: Partial<Vehicle> = {
      make: vehicle.make,
      fuelType: vehicle.fuelType,
      model: vehicle.model,
      price: vehicle.price
    };
    return this.http.post<Vehicle>('http://localhost:3000/vehicle', vehicleSave);
  }
}
