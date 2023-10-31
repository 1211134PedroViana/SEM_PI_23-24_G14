import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Floor } from '../../../src/domain/floor'; 
import { Description } from '../../../src/domain/valueObjects/description';
import IFloorDTO from '../../../src/dto/IFloorDTO';
import 'mocha';

describe("Floor Domain", () => {
    beforeEach(function() {});

    it('Should return result success when creating a Floor with valid arguments', () => {
        const floorDTO = {
            buildingId: 'building-123',
            floorNumber: 1,
            description: 'Sample Description',
        } as IFloorDTO;

        const uniqueId = new UniqueEntityID(); // Use a real UniqueEntityID instance or a mock

        const floorResult = Floor.create(floorDTO, uniqueId);
        expect(true).to.equal(floorResult.isSuccess);
        expect(false).to.equal(floorResult.isFailure);
    });

    it('Should return result success when creating a Floor with valid arguments', () => {
        const floorDTO = {
            id: 'floor-123', 
            buildingId: 'building-123',
            floorNumber: 1,
            description: 'Sample Description',
        } as IFloorDTO;
    
        const uniqueId = new UniqueEntityID(); // Use a real UniqueEntityID instance or a mock
    
        const floorResult = Floor.create(floorDTO, uniqueId);
        expect(true).to.equal(floorResult.isSuccess);
        expect(false).to.equal(floorResult.isFailure);
    });

    it('Should return result fail when creating a Floor with missing properties', () => {
        const floorDTO = {
            // Missing buildingId and floorNumber
            description: 'Sample Description',
        } as IFloorDTO;

        const floorResult = Floor.create(floorDTO);
        expect(true).to.equal(floorResult.isFailure);
        expect(false).to.equal(floorResult.isSuccess);
    });

});
