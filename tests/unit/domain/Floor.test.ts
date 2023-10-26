import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Building } from '../../../src/domain/building';


describe("Building Domain", () => {
    beforeEach(function() {});


    it('Should return result sucess when creating a Building with valid arguments', () => {
        const building = Building.create(
        {
            code: BuildingCode.create("AX56H").getValue(),
            description: Description.create("Departamento de Dummys").getValue(),
            name: "Dummy Building"
        });
        expect(true).to.equal(building.isSuccess);
        expect(false).to.equal(building.isFailure);
    })

    it('Should return result sucess when creating a Building with no description and name', () => {
        const building = Building.create(
        {
            code: BuildingCode.create("AX56H").getValue(),
            description: Description.create("").getValue(),
            name: ""
        });
        expect(true).to.equal(building.isSuccess);
        expect(false).to.equal(building.isFailure);
    })

    it('Should return result fail when creating a Building Code with invalid format', () => {
        const code = BuildingCode.create("AX56HAHTHHT5");

        expect(true).to.equal(code.isFailure);
        expect(false).to.equal(code.isSuccess);
        expect('Invalid Building Code format').to.equal(code.errorValue());
    })

    it('Should return result fail when creating a Description with invalid format', () => {
        const descriptionOrError = Description.create("TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT") 
        
        expect(true).to.equal(descriptionOrError.isFailure);
        expect(false).to.equal(descriptionOrError.isSuccess);
        expect('Description exceeds the maximum characters(255)').to.equal(descriptionOrError.errorValue());
    })

})