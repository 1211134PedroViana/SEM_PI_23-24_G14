import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {ElevatorService} from "../../src/elevatorService/elevator.service";
import Elevator from "../../src/elevatorService/elevator";

describe('ElevatorService', () => {
  let service: ElevatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElevatorService]
    });

    service = TestBed.inject(ElevatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should update an elevator', inject([ElevatorService], (elevatorService: ElevatorService) => {
    const updatedElevator: Elevator = {
      brand: "",
      buildingId: "",
      code: "",
      floorList: [],
      location: {direction: "", positionX: 0, positionY: 0},
      model: "",
      // Defina os campos que você deseja atualizar
      id: 'c20d7250-c46d-4434-b9b2-fd8f9a543f03',
      serialNumber: '123123123',
      description: 'Building B Elevator Test'
      // Outros campos...
    };

    // Chame o método de atualização do serviço
    service.updateElevator(updatedElevator).subscribe(response => {
      expect(response).toEqual(updatedElevator);  // Verifica se a resposta é a esperada
    });

    // Verifica se a solicitação HTTP é enviada corretamente
    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators/update');
    expect(req.request.method).toEqual('PUT');  // Verifica se o método HTTP é PUT
    expect(req.request.body).toEqual(updatedElevator);  // Verifica se o corpo da solicitação é o esperado

    // Simula uma resposta do servidor
    req.flush(updatedElevator);
  }));
});
