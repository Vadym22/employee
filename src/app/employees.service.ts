import { Injectable } from '@angular/core';

export interface IEmployee {
  id: number;
  firstName: string;
  image: string;
  gender: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor() { }

  getEmployees() {
    return [
        {
          id: 1,
          firstName: "Oleg",
          title: "FE developer",
          gender: "male",
          image: "https://picsum.photos/400"
        },
        {
          id: 2,
          firstName: "Ivan",
          title: "BE developer",
          gender: "male",
          image: ""
        },
        {
          id: 3,
          firstName: "Roman",
          title: "PM",
          gender: "male",
          image: "https://picsum.photos/400"
        },
        {
          id: 4,
          firstName: "Nazar",
          title: "DM",
          gender: "male",
          image: "https://picsum.photos/400"
        },
        {
          id: 5,
          firstName: "Anna",
          title: "FE developer",
          gender: "female",
          image: "https://picsum.photos/400"
        },
        {
          id: 6,
          firstName: "Olena",
          title: "BE developer",
          gender: "female",
          image: "https://picsum.photos/400"
        },
        {
          id: 7,
          firstName: "Natalia",
          title: "PM",
          gender: "female",
          image: "https://picsum.photos/400"
        },
        {
          id: 8,
          firstName: "Oksana",
          title: "DM",
          gender: "female",
          image: "https://picsum.photos/400"
        }
      ]
    }
}
