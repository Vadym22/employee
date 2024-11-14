import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmployeesService, IEmployee } from '../employees.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent implements OnInit {
  public employeesData: IEmployee[] | undefined;
  public selectedEmployees: IEmployee[] | undefined;
  public currentEmployee: IEmployee | undefined;
  public randomEmployees: any;
  public isAnswerCorrect: boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(private employeesService: EmployeesService) { }
  ngOnInit() {
    if (this.employeesService) {
      this.employeesData = this.employeesService.getEmployees();
      this.selectedEmployees = [...this.employeesData];
      this.getRandomEmployee();
      this.getRandomEmployees();
    };
  }
  getRandomEmployee() {
    if (this.selectedEmployees) {
      const randomIndex = Math.floor(Math.random() * this.selectedEmployees.length);
      this.currentEmployee = this.selectedEmployees[randomIndex];
      this.selectedEmployees.splice(randomIndex, 1);
    }
  }

  getRandomEmployees() {
    if (this.employeesData && this.currentEmployee) {
      const filteredEmployees = this.employeesData.filter(e => e.gender === this.currentEmployee?.gender && e.id !== this.currentEmployee.id); // Exclude selected employee

      const randomIndices: number[] = [];
      while (randomIndices.length < 3) {
        const randomIndex = Math.floor(Math.random() * filteredEmployees.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      const insertionIndex = Math.floor(Math.random() * 3);
      randomIndices.splice(insertionIndex, 0, filteredEmployees.length);
      this.randomEmployees = randomIndices.map(index => {
        if (index === filteredEmployees.length) {
          return this.currentEmployee;
        } else {
          return filteredEmployees[index];
        }
      });
    }
  }

  onEmployeeClick(employee: IEmployee) {
    if (this.currentEmployee?.firstName === employee.firstName) {
      this.isAnswerCorrect = true;
      employee = { ...employee, buttonColor: "secondary" };
    } else {
      this.isAnswerCorrect = false;
      employee = { ...employee, buttonColor: "warn" };
    }
  }

  openDialog() {
    this.dialog.open(SelectDialogComponent);
  }
}

