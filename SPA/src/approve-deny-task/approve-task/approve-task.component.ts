  import { Component } from '@angular/core';
  import { catchError, tap } from 'rxjs/operators';
  import { forkJoin, Observable } from 'rxjs';
  import { Router } from '@angular/router';
  import { BuildingService } from 'src/buildingService/building.service';
  import { FloorService } from 'src/floorService/floor-service';
  import { TaskService } from 'src/taskService/task.service';
  import SurveillanceTask from 'src/taskService/surveillanceTask';
  import PickupAndDeliveryTask from 'src/taskService/pickupAndDeliveryTask';
  import { SystemUserService } from 'src/systemUserService/systemUser.service';

  @Component({
    selector: 'app-approveTask',
    templateUrl: './approve-task.component.html',
    styleUrls: ['./approve-task.component.css']
  })
  export class ApproveTaskComponent {

    observables: Observable<any>[] = [];

    selectedStatus = '';
    isFormVisible: boolean = true;
    isListVisible: boolean = false;
    survTasks: SurveillanceTask[] = [];
    pickupTasks: PickupAndDeliveryTask[] = [];
    parsedSurvTasks: SurveillanceTask[] = [];
    parsedPickTasks: PickupAndDeliveryTask[] = [];

    constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService, 
      private floorService: FloorService, private router: Router) { }

    closeForm() {
      this.isListVisible = false;
      this.router.navigate(["/task/searchTask"]);
    }

    onSubmit() {

      this.taskService.getByStatusSurveillanceTask(this.selectedStatus)
        .pipe(
          tap((response) => {
            this.survTasks = response;
            this.parseSurvList();
          }),
          catchError((error) => {
            console.error('Error occurred while listing the tasks', error);
            throw error;
          })
        )
        .subscribe()

      this.taskService.getByStatusPickupAndDelivery(this.selectedStatus)
        .pipe(
          tap((response) => {
            this.pickupTasks = response;
            this.parsePickList();
            this.isFormVisible = false;
            this.isListVisible = true;
          }),
          catchError((error) => {
            console.error('Error occurred while listing the tasks', error);
            throw error;
          })
        )
        .subscribe()
      
    }

    parseSurvList() {
      for(let i = 0; i < this.survTasks.length; i++) {
        let building: any;
        let user: any;
        let floors: string[] = [];

        this.userService.getUserById(this.survTasks[i].userId)
        .pipe(
          tap((response) => {
            user = response;

            this.buildingService.getBuildingById(this.survTasks[i].buildingId)
            .pipe(
              tap((response) => {
                building = response;

                for(let j = 0; j < this.survTasks[i].floorIds.length; j++) {
                  let observable: Observable<any> = this.floorService.getFloorById(this.survTasks[i].floorIds[j])
                  .pipe(
                  tap((response) => {
                    floors.push(response.floorNumber.toString())
                  }),
                  catchError((error) => {
                    console.error('Error occurred while getting the Floor', error);
                    throw error;
                  })
                  )
                  this.observables.push(observable);
                }

                forkJoin(this.observables).subscribe((responses: any[]) => {
                  const validResponses = responses.filter(response => response !== null);
                  const floors = validResponses.map(response => response.floorNumber.toString());
                
                  const surveillanceTask = {
                    buildingId: building.name,
                    floorIds: floors,
                    startPlace: this.survTasks[i].startPlace,
                    endPlace: this.survTasks[i].endPlace,
                    phoneNumber: this.survTasks[i].phoneNumber,
                    status: this.survTasks[i].status,
                    userId: user.email
                  } as SurveillanceTask;
                
                  this.parsedSurvTasks.push(surveillanceTask);
                });

              }),
            catchError((error) => {
            console.error('Error occurred while getting the Building', error);
            throw error;
          })
          )
          .subscribe()

          }),
          catchError((error) => {
            console.error('Error occurred while getting the User', error);
            throw error;
          })
        )
        .subscribe()  

      }
    }

    parsePickList() {
      for(let i = 0; i < this.pickupTasks.length; i++) {
        let user: any;

        this.userService.getUserById(this.survTasks[i].userId)
        .pipe(
          tap((response) => {
            user = response;

            const pickupAndDeliveryTask = ({  
              pickupPlace: this.pickupTasks[i].pickupPlace,
              deliveryPlace: this.pickupTasks[i].deliveryPlace,
              pickupPersonName: this.pickupTasks[i].pickupPersonName,
              pickupPersonPhoneNumber: this.pickupTasks[i].pickupPersonPhoneNumber,
              deliveryPersonName: this.pickupTasks[i].deliveryPersonName,
              deliveryPersonPhoneNumber: this.pickupTasks[i].deliveryPersonPhoneNumber,
              description: this.pickupTasks[i].description,
              confirmationCode: this.pickupTasks[i].confirmationCode,
              status: this.pickupTasks[i].status,
              userId: user.email
            }) as PickupAndDeliveryTask;

            this.parsedPickTasks.push(pickupAndDeliveryTask);

          }),
          catchError((error) => {
            console.error('Error occurred while getting the User', error);
            throw error;
          })
        )
        .subscribe()  

      }
    }

    approveSurveillanceTask(surveillanceTask: SurveillanceTask) {
      const selectedTask = this.parsedSurvTasks.find(task => task); 

      if (selectedTask) {
        this.taskService.approveSurveillanceTask(surveillanceTask)
          .pipe(
            // catchError((error) => {
            //   console.error('Erro ao aprovar a tarefa de vigilância', error);
            //   throw error;
            // })
          )
          .subscribe(() => {
            // Lógica adicional após aprovar a tarefa de surveillance
          });
        }
      }

    denySurveillanceTask(surveillanceTask: SurveillanceTask) {
      this.taskService.denySurveillanceTask(surveillanceTask)
        .pipe(
          // catchError((error) => {
          //   console.error('Erro ao aprovar a tarefa de vigilância', error);
          //   throw error;
          // })
        )
        .subscribe(() => {
          // Lógica adicional após aprovar a tarefa de surveillance
        });
    }

    approvePickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask) {
      this.taskService.approvePickupAndDeliveryTask(pickupAndDeliveryTask)
        .pipe(
            // catchError((error) => {
            //   console.error('Erro ao aprovar a tarefa de vigilância', error);
            //   throw error;
            // })
        )
        .subscribe(() => {
          // Lógica adicional após aprovar a tarefa de pickUpAndDelivery
        });
    }

    denyPickupAndDeliveryTask(pickupAndDeliveryTask: PickupAndDeliveryTask) {
      this.taskService.approvePickupAndDeliveryTask(pickupAndDeliveryTask)
        .pipe(
             // catchError((error) => {
            //   console.error('Erro ao aprovar a tarefa de vigilância', error);
            //   throw error;
            // })
        )  
        .subscribe(() => {
          // Lógica adicional após aprovar a tarefa de pickUpAndDelivery
        })
    }

      
  }
  
