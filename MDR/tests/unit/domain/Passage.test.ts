import { expect } from 'chai';
import { Passage } from '../../../src/domain/passage';
import { Location } from '../../../src/domain/valueObjects/location';
import IPassageDTO from '../../../src/dto/IPassageDTO';

describe("Passage Domain", () => {
    beforeEach(function() {});

    it('Should return result sucess when creating a Passage with valid arguments', () => {
        const location = Location.create({positionX: 2, positionY:2, direction:"west"});

        const passageDTO = {
            fromFloorId: "653a39fa63d09ff25a368334",
             toFloorId: "653a39fa63d09ff25a368335",
             location: {
                 positionX: 2,
                 positionY: 2,
                 direction: "west"
                }
		} as IPassageDTO;

        const passage = Passage.create(passageDTO);

        try {

            expect(true).to.equal(passage.isSuccess);
            expect(false).to.equal(passage.isFailure);

        } catch(error) {
            throw error;
        }
    });


    it('Should return result fail when creating a Passage with no Floor IDs', () => {
        const passageDTO = {
            location: {
                positionX: 2,
                positionY:2,
                direction:"west"
            }
        } as IPassageDTO;
        
        const passage = Passage.create(passageDTO);

        try {

            expect(true).to.equal(passage.isFailure);
            expect(false).to.equal(passage.isSuccess);
            expect('Must provide the Floor IDs and the Location').to.equal(passage.errorValue());

        } catch(error) {
            throw error;
        }
    });


    it('Should return result fail when creating a Passage with no Location', () => {
        const location = Location.create({positionX: -2, positionY:-2, direction:"west"});

        try {

            expect(true).to.equal(location.isFailure);
            expect(false).to.equal(location.isSuccess);
            expect('Invalid positions values').to.equal(location.errorValue());

        } catch(error) {
            throw error;
        }
    });


});