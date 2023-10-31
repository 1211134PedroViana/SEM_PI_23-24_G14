/*
import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Elevator } from '../../../src/domain/elevator'; 
import { ElevatorCode } from '../../../src/domain/valueObjects/elevatorCode';
import { Location } from '../../../src/domain/valueObjects/location';
import IElevatorDTO from '../../../src/dto/IElevatorDTO';
import 'mocha';

describe('Elevator Domain', () => {
    beforeEach(function() {});

    it('Should return result success when creating an Elevator with valid arguments', () => {
        const elevatorDTO = {
            code: 'E001',
            location: {
                positionX: 1,
                positionY: 2,
                direction: 'up',
            },
            buildingId: 'building-123',
        } as IElevatorDTO;

        const uniqueId = new UniqueEntityID(); // Use a real UniqueEntityID instance or a mock

        const elevatorResult = Elevator.create(elevatorDTO, uniqueId);
        expect(elevatorResult.isSuccess).to.equal(true);
        expect(elevatorResult.isFailure).to.equal(false);
    });

    it('Should return result success when creating an Elevator with a valid ID', () => {
        const elevatorDTO = {
            id: 'elevator-123', 
            code: 'E002',
            location: {
                positionX: 2,
                positionY: 3,
                direction: 'down',
            },
            buildingId: 'building-456',
        } as IElevatorDTO;
    
        const uniqueId = new UniqueEntityID(); 
    
        const elevatorResult = Elevator.create(elevatorDTO, uniqueId);
        expect(elevatorResult.isSuccess).to.equal(true);
        expect(elevatorResult.isFailure).to.equal(false);
    });

});
*/

