import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Room } from '../../../src/domain/room';
import IRoomDTO from '../../../src/dto/IRoomDTO';
import 'mocha';

describe("Room Domain", () => {

    it('Should return result failure when creating a Room with missing properties', () => {
        const roomDTO: Partial<IRoomDTO> = {
            id: 'room-123',
            code: 'R123',
            name: 'Sample Room',
            description: 'A room for testing',
            dimension: {
                pos1: 1,
                pos2: 2,
                pos3: 3,
                pos4: 4,
            },
            location: {
                positionX: 10,
                positionY: 20,
                direction: 'north',
            },
            // Omitting 'floorId' which is required
        };
    
        const roomResult = Room.create(roomDTO as IRoomDTO);
        expect(true).to.equal(roomResult.isFailure);
        expect(false).to.equal(roomResult.isSuccess);
    });
    
});
