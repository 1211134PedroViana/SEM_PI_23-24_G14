import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import IBuildingDTO from '../../src/dto/IBuildingDTO';
import BuildingController from '../../src/controllers/buildingController';
import IBuildingService from '../../src/services/IServices/IBuildingService';
import BuildingRepo from '../../src/repos/buildingRepo';
import BuildingService from '../../src/services/buildingService';
import BuildingSchema from '../../src/persistence/schemas/buildingSchema';
import { SinonSpy } from 'sinon';


describe('Building Controller', function () {
	const sandbox = sinon.createSandbox();

    let buildingRepo : BuildingRepo;
    let service : BuildingService;

    let stub1, stub2;

	before(function() {
		buildingRepo = new BuildingRepo(BuildingSchema);
        service = new BuildingService(buildingRepo);
    });

	after(function() {
		sandbox.restore();
	});

    it('buildingController unit test using buildingService stub', async function () {
        
		// Arrange
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy() as SinonSpy<[any?]>
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(service, "createBuilding").
        resolves( Result.ok<IBuildingDTO>( {
            "id": "123",
            "code": req.body.code,
            "description": req.body.description,"name": req.body.name} 
        ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
		    sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
		    sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ 
                "id": "123",
                "code": req.body.code,
                "description": req.body.description,"name": req.body.name
            }));

        } catch(error) {
            throw error;
        }
	});

    /*
    it('roleController + roleService integration test using roleRepoistory and Role stubs', async function () {	
		// Arrange	
        let body = { "name":'role12' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Role, "create").returns(Result.ok({"id":"123", "name": req.body.name}));

		let roleRepoInstance = Container.get("RoleRepo");
		sinon.stub(roleRepoInstance, "save").returns(new Promise<Role>((resolve, reject) => {
			resolve(Role.create({"id":"123", "name": req.body.name}).getValue())
		}));

		let roleServiceInstance = Container.get("RoleService");

		const ctrl = new RoleController(roleServiceInstance as IRoleService);

		// Act
		await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123","name": req.body.name}));
	});


    it('roleController + roleService integration test using spy on roleService', async function () {		
		// Arrange
        let body = { "name":'role12' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let roleRepoInstance = Container.get("RoleRepo");
		sinon.stub(roleRepoInstance, "save").returns(new Promise<Role>((resolve, reject) => {
			resolve(Role.create({"id":"123", "name": req.body.name}).getValue())
		}));

		let roleServiceInstance = Container.get("RoleService");		
		const roleServiceSpy = sinon.spy(roleServiceInstance, "createRole");

		const ctrl = new RoleController(roleServiceInstance as IRoleService);

		// Act
		await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123","name": req.body.name}));
		sinon.assert.calledOnce(roleServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(roleServiceSpy, sinon.match({name: req.body.name}));
	});


    it('roleController unit test using roleService mock', async function () {		
		// Arrange
        let body = { "name":'role12' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let roleServiceInstance = Container.get("RoleService");		
		const roleServiceMock = sinon.mock(roleServiceInstance, "createRole")
		roleServiceMock.expects("createRole")
			.once()
			.withArgs(sinon.match({name: req.body.name}))
			.returns(Result.ok<IRoleDTO>( {"id":"123", "name": req.body.name} ));

		const ctrl = new RoleController(roleServiceInstance as IRoleService);

		// Act
		await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		roleServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123","name": req.body.name}));
	});
    */
});