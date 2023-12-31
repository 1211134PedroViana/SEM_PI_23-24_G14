import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Building } from '../../../src/domain/building';
import { BuildingCode } from '../../../src/domain/valueObjects/buildingCode';
import { Description } from '../../../src/domain/valueObjects/description';
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import 'mocha';


describe("Building Domain", () => {
    beforeEach(function() {});


    it('Should return result sucess when creating a Building with valid arguments', () => {
        const buildingDTO = {
			code: "AX56H",
			description: "Departamento de Dummys",
			name: "Dummy Building"
		} as IBuildingDTO;

        const building = Building.create(buildingDTO);
        expect(true).to.equal(building.isSuccess);
        expect(false).to.equal(building.isFailure);
    })

    it('Should return result sucess when creating a Building with no description and name', () => {
        const buildingDTO = {
            code: "TEST"
        } as IBuildingDTO;

        const building = Building.create(buildingDTO);

        try {

            expect(true).to.equal(building.isSuccess);
            expect(false).to.equal(building.isFailure);

        } catch(error) {
            throw error;
        }
        
    })

    it('Should return result fail when creating a Building Code with invalid format', () => {
        const code = BuildingCode.create("AX56HAHTHHT5");

        try {

            expect(true).to.equal(code.isFailure);
            expect(false).to.equal(code.isSuccess);
            expect('Invalid Building Code format').to.equal(code.errorValue());

        } catch(error) {
            throw error;
        }
    });

    it('Should return result fail when creating a Description with invalid format', () => {
        const descriptionOrError = Description.create("TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT") 
        
        try {

            expect(true).to.equal(descriptionOrError.isFailure);
            expect(false).to.equal(descriptionOrError.isSuccess);
            expect('Description exceeds the maximum characters(255)').to.equal(descriptionOrError.errorValue());

        } catch(error) {
            throw error;
        }
    });

})
