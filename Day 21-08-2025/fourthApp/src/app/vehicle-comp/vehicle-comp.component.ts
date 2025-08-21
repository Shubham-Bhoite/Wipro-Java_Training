import { ChangeDetectorRef, Component } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-comp',
  imports: [CommonModule, FormsModule],
  standalone:true,
  templateUrl: './vehicle-comp.component.html',
  styleUrls: ['./vehicle-comp.component.css']
})
export class VehicleCompComponent {
  constructor(private vehicleService: VehicleService, private cdr: ChangeDetectorRef) { }

  vehicles: Vehicle[] = [];

  vehicleEdit: Vehicle = { id: '', make: '', fuelType: '', model: '', price:0 };
  vehicleAdd: Vehicle = { id: '', make: '', fuelType: '', model: '', price: 0 };

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe({
      next: (data: Vehicle[]) => {
        console.log('Vehicles fetched successfully:', data);
        this.vehicles = data;
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }

  edit(vehicleId: string) {
    this.vehicleService.getVehicleById(vehicleId).subscribe({
      next: (vehicle: Vehicle) => {
        console.log('Vehicle details:', vehicle);
        this.vehicleEdit = { ...vehicle };
      },
      error: (error) => console.error('Error fetching vehicle by ID:', error)
    });
  }

  update() {
    this.vehicleService.updateVehicle(this.vehicleEdit).subscribe({
      next: (updatedVehicle: Vehicle) => {
        const index = this.vehicles.findIndex(v => v.id === updatedVehicle.id);
        if (index !== -1) this.vehicles[index] = updatedVehicle;
        this.vehicleEdit = { id: '', make: '', fuelType: '', model: '', price: 0 };
      },
      error: (error) => console.error('Error updating vehicle:', error)
    });
  }

  delete(vehicleId: string) {
    this.vehicleService.deleteVehicle(vehicleId).subscribe({
      next: () => {
        this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
      },
      error: (error) => console.error('Error deleting vehicle:', error)
    });
  }

  save() {
    this.vehicleService.saveVehicle(this.vehicleAdd).subscribe({
      next: (newVehicle: Vehicle) => {
        this.vehicles.push(newVehicle);
        this.vehicleAdd = { id: '', make: '', fuelType: '', model: '', price: 0 };
      },
      error: (error) => console.error('Error saving vehicle:', error)
    });
  }
}
