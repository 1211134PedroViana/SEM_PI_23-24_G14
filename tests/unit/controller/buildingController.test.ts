/*
import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import BuildingController from '../../../src/controllers/buildingController'
import { Result } from '../../../src/core/logic/Result';
import IBuildingService from '../../../src/services/IServices/IBuildingService';
import { Building } from '../../../src/domain/building';
import { BuildingCode } from '../../../src/domain/buildingCode';
import { Description } from '../../../src/domain/description';


describe('building controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
		Container.set("buildingSchema", buildingSchemaInstance);

		let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
		let buildingRepoInstance = Container.get(buildingRepoClass);
		Container.set("BuildingRepo", buildingRepoInstance);

		let buildingServiceClass = require("../../../src/services/buildingService").default;
		let buildingServiceInstance = Container.get(buildingServiceClass);
		Container.set("BuildingService", buildingServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('buildingController unit test using buildingService stub', async function () {
		// Arrange
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
        type CreateBuildingFunction = (req: Request, res: Response, next: NextFunction) => Result<IBuildingDTO>;

        sinon.stub(buildingServiceInstance, "createBuilding" as any).callsFake((req, res, next) => {
            // Mock the behavior here
            return Result.ok<IBuildingDTO>({
              "id": "123",
              "code": req.body.code,
              "description": req.body.description,
              "name": req.body.name
            });
          });
          
		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", "code": req.body.code, "description": req.body.description, "name": req.body.name}));
	});


    it('buildingController + buildingService integration test using buildingRepoistory and Building stubs', async function () {	
		// Arrange	
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").returns(Result.ok({"id":"123", "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing'}));

		let buildingRepoInstance = Container.get("BuildingRepo");
        let code = BuildingCode.create("IDGAF").getValue();
        let description = Description.create("Departamento de Testos").getValue();

		sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"code":code, "description":description, "name":'somesing'}).getValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing'}));
        done();
	});

    it('buildingController unit test using buildingService mock', async function () {		
		// Arrange
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");		
		const buildingServiceMock = sinon.mock(buildingServiceInstance, "createBuilding")
		buildingServiceMock.expects("createBuilding")
			.once()
			.withArgs(sinon.match({code: req.body.code, description: req.body.description, name: req.body.name}))
			.returns(Result.ok<IBuildingDTO>( {"id":"123", "code": req.body.code, "description": req.body.description, "name": req.body.name}));

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		buildingServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "code": req.body.code, "description": req.body.description, "name": req.body.name }));
	});
});
*/