using System;
using System.Threading.Tasks;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Mpt.Controllers;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Test;

[TestClass]
public class SurveillanceTaskControllerTest
{

    private Mock<IUnitOfWork> _unitOfWorkMock;
    private Mock<ISurveillanceTaskRepository> _repoMock;
    private Mock<ISystemUserRepository> _userRepoMock;
    private Mock<ISurveillanceTaskService> _survServiceMock;
    private SurveillanceTasksController _survController;
    private List<SurveillanceTaskDTO> expectedTasks;

    [TestInitialize]
    public void Setup()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _userRepoMock = new Mock<ISystemUserRepository>();
        _repoMock = new Mock<ISurveillanceTaskRepository>();
        _survServiceMock = new Mock<ISurveillanceTaskService>();
        _survController = new SurveillanceTasksController(_survServiceMock.Object);

        expectedTasks = new List<SurveillanceTaskDTO> {
            new SurveillanceTaskDTO(Guid.NewGuid(),"ABCD", "BLD A","21321312", "sala(k1)", 
            "sala(r2)", "915368000", TasksStatus.Pending, new SystemUserId(Guid.NewGuid())),

            new SurveillanceTaskDTO(Guid.NewGuid(), "A4CD", "BLD B", "21321312", "sala(b202)", 
            "sala(b103)", "915368000", TasksStatus.Approved, new SystemUserId(Guid.NewGuid())),

            new SurveillanceTaskDTO(Guid.NewGuid(), "45CD", "BLD C", "21321312", "sala(c204)", 
            "sala(c301)", "915368000", TasksStatus.Refused, new SystemUserId(Guid.NewGuid()))
        };
    }
    
    // GET request to api/SurveillanceTasks returns a list of SurveillanceTaskDTO objects
[TestMethod]
public async Task test_get_all_surveillance_tasks()
{

    _survServiceMock.Setup(s => s.GetAllAsync()).ReturnsAsync(expectedTasks);

    // Act
    var result = await _survController.GetAll();

    // Assert
    Assert.AreEqual(expectedTasks, result.Value);
}

    // GET request to api/SurveillanceTasks/searchByStatus/{status} returns a list of SurveillanceTaskDTO objects filtered by status
[TestMethod]
public async Task test_get_tasks_by_status()
{
    var status = "Pending";
    _survServiceMock.Setup(s => s.GetByStatusAsync(status)).ReturnsAsync(expectedTasks);

    // Act
    var result = await _survController.GetTasksByStatus(status);

    // Assert
    Assert.AreEqual(expectedTasks, result.Value);
}

    // GET request to api/SurveillanceTasks/searchByUser/{userId} returns a list of SurveillanceTaskDTO objects filtered by user
[TestMethod]
public async Task test_get_tasks_by_user()
{
    var userId = "424124141";
    _survServiceMock.Setup(s => s.GetByUserAsync(userId)).ReturnsAsync(expectedTasks);

    // Act
    var result = await _survController.GetTasksByUser(userId);

    // Assert
    Assert.AreEqual(expectedTasks, result.Value);
}

    // GET request to api/SurveillanceTasks/searchByStatus/{status} with an invalid status returns an empty list
[TestMethod]
public async Task test_get_tasks_by_invalid_status()
{
    var invalidStatus = "InvalidStatus";

    var expectedTasks = new List<SurveillanceTaskDTO>();

    _survServiceMock.Setup(s => s.GetByStatusAsync(invalidStatus)).ReturnsAsync(expectedTasks);

    // Act
    var result = await _survController.GetTasksByStatus(invalidStatus);

    // Assert
    Assert.AreEqual(expectedTasks, result.Value);
}

    // GET request to api/SurveillanceTasks/searchByUser/{userId} with an invalid userId returns an empty list
[TestMethod]
public async Task test_get_tasks_by_invalid_user()
{
    var invalidUserId = "InvalidUserId";

    var expectedTasks = new List<SurveillanceTaskDTO>();

    _survServiceMock.Setup(s => s.GetByUserAsync(invalidUserId)).ReturnsAsync(expectedTasks);

    // Act
    var result = await _survController.GetTasksByUser(invalidUserId);

    // Assert
    Assert.AreEqual(expectedTasks, result.Value);
}

    // GET request to api/SurveillanceTasks/{id} with an invalid id returns a NotFound response
[TestMethod]
public async Task test_get_task_by_invalid_id()
{
    var invalidId = Guid.NewGuid();

    SurveillanceTaskDTO expectedTask = null;

    _survServiceMock.Setup(s => s.GetByIdAsync(It.IsAny<SurveillanceTaskId>())).ReturnsAsync(expectedTask);

    // Act
    var result = await _survController.GetGetById(invalidId);

    // Assert
    Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
}

}