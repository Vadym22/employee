import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { EmployeesService, IEmployee } from '../employees.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent implements OnInit {
  public employeesData: IEmployee[] | undefined;
  public selectedEmployees: IEmployee[] | undefined;
  public selectedEmployee: IEmployee | undefined;
  public randomNames: any;
  constructor(private employeesService: EmployeesService) { }
  ngOnInit() {
    if(this.employeesService) {
      this.employeesData = this.employeesService.getEmployees();
      this.selectedEmployees = [...this.employeesData];
      this.getRandomEmployee();
      this.getRandomNames();
    };
  }
  getRandomEmployee() {
    if(this.selectedEmployees) {
    const randomIndex = Math.floor(Math.random() * this.selectedEmployees.length);
    this.selectedEmployee = this.selectedEmployees[randomIndex];
    this.selectedEmployees.splice(randomIndex, 1);
    }
  }

  // getRandomNames() {
  //   if (this.employeesData && this.selectedEmployee) {
  //     const filteredEmployee = this.employeesData.filter(e => e.gender === this.selectedEmployee?.gender);
  //     const randomIndices: number[] = [];
  
  //     while (randomIndices.length < 3) {
  //       const randomIndex = Math.floor(Math.random() * filteredEmployee.length);
  //       if (!randomIndices.includes(randomIndex)) {
  //         randomIndices.push(randomIndex);
  //       }
  //     }
  //     this.randomNames = randomIndices.map(index => filteredEmployee[index].firstName);
  //   }
  // }

getRandomNames() {
  if (this.employeesData && this.selectedEmployee) {
    const filteredEmployees = this.employeesData.filter(e => e.gender === this.selectedEmployee?.gender && e.id !== this.selectedEmployee.id); // Exclude selected employee

    const randomIndices: number[] = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * filteredEmployees.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    const insertionIndex = Math.floor(Math.random() * 3);
    randomIndices.splice(insertionIndex, 0, filteredEmployees.length);
    this.randomNames = randomIndices.map(index => {
      if (index === filteredEmployees.length) {
        return this.selectedEmployee?.firstName;
      } else {
        return filteredEmployees[index].firstName;
      }
    });
  }
}
}

