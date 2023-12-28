using System;
using System.Threading.Tasks;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Test;

[TestClass]
public class SurveillanceTaskServiceTest
{

    private Mock<IUnitOfWork> _unitOfWorkMock;
    private Mock<ISurveillanceTaskRepository> _repoMock;
    private Mock<ISystemUserRepository> _userRepoMock;
    private SurveillanceTaskService _survService;

    [TestInitialize]
    public void Setup()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _userRepoMock = new Mock<ISystemUserRepository>();
        _repoMock = new Mock<ISurveillanceTaskRepository>();
        _survService = new SurveillanceTaskService(_unitOfWorkMock.Object, _repoMock.Object, _userRepoMock.Object);
    }
    
    // Should be able to retrieve all surveillance tasks
[TestMethod]
public async Task should_retrieve_all_surveillance_tasks()
{

    var surveillanceTasks = new List<SurveillanceTask>
    {
        new SurveillanceTask("Building1", "Floor1", "Start1", "End1", "1234567890", new SystemUserId(Guid.NewGuid())),
        new SurveillanceTask("Building2", "Floor2", "Start2", "End2", "0987654321", new SystemUserId(Guid.NewGuid()))
    };

    _repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(surveillanceTasks);

    // Act
    var result = await _survService.GetAllAsync();

    // Assert
    Assert.AreEqual(surveillanceTasks.Count, result.Count);
    for (int i = 0; i < surveillanceTasks.Count; i++)
    {
        Assert.AreEqual(surveillanceTasks[i].Id.AsGuid(), result[i].Id);
        Assert.AreEqual(surveillanceTasks[i].BuildingId, result[i].BuildingId);
        Assert.AreEqual(surveillanceTasks[i].FloorId, result[i].FloorId);
        Assert.AreEqual(surveillanceTasks[i].StartPlace, result[i].StartPlace);
        Assert.AreEqual(surveillanceTasks[i].EndPlace, result[i].EndPlace);
        Assert.AreEqual(surveillanceTasks[i].PhoneNumber, result[i].PhoneNumber);
        Assert.AreEqual(surveillanceTasks[i].Status, result[i].Status);
    }
}

    // Should be able to retrieve a surveillance task by id
[TestMethod]
public async Task should_retrieve_surveillance_task_by_id()
{

    var taskId = Guid.NewGuid();
    var surveillanceTask = new SurveillanceTask("Building1", "Floor1", "Start1", "End1", "1234567890", new SystemUserId(Guid.NewGuid()));

    _repoMock.Setup(r => r.GetByIdAsync(It.IsAny<SurveillanceTaskId>())).ReturnsAsync(surveillanceTask);

    // Act
    var result = await _survService.GetByIdAsync(new SurveillanceTaskId(taskId));

    // Assert
    Assert.IsNotNull(result);
    Assert.AreEqual(surveillanceTask.Id.AsGuid(), result.Id);
    Assert.AreEqual(surveillanceTask.BuildingId, result.BuildingId);
    Assert.AreEqual(surveillanceTask.FloorId, result.FloorId);
    Assert.AreEqual(surveillanceTask.StartPlace, result.StartPlace);
    Assert.AreEqual(surveillanceTask.EndPlace, result.EndPlace);
    Assert.AreEqual(surveillanceTask.PhoneNumber, result.PhoneNumber);
    Assert.AreEqual(surveillanceTask.Status, result.Status);
}

    // Should be able to add a new surveillance task
[TestMethod]
public async Task should_add_new_surveillance_task()
{

    var taskId = Guid.NewGuid();
    var user = new SystemUser("1210825@isep.ipp.pt", "12345", new RoleId("50c1bbcb-7c93-4794-aab0-c765d8b8903a"), "915368555", "123456789");
    var createDto = new CreateSurveillanceTaskDTO
    (
        "Building1",
        "Floor1",
        "Start1",
        "End1",
        "1234567890",
        user.Id.AsString()
    );

    _userRepoMock.Setup(repo => repo.GetByIdAsync(user.Id)).ReturnsAsync(user);

    var surveillanceTask = new SurveillanceTask(createDto.BuildingId, createDto.FloorId, createDto.StartPlace, createDto.EndPlace, createDto.PhoneNumber, createDto.UserId);

    // Act
    var result = await _survService.AddAsync(createDto);

    // Assert
    Assert.IsNotNull(result);
    Assert.AreEqual(surveillanceTask.BuildingId, result.BuildingId);
    Assert.AreEqual(surveillanceTask.FloorId, result.FloorId);
    Assert.AreEqual(surveillanceTask.StartPlace, result.StartPlace);
    Assert.AreEqual(surveillanceTask.EndPlace, result.EndPlace);
    Assert.AreEqual(surveillanceTask.PhoneNumber, result.PhoneNumber);
    Assert.AreEqual(surveillanceTask.Status, result.Status);

    _repoMock.Verify(r => r.AddAsync(It.IsAny<SurveillanceTask>()), Times.Once);
    _unitOfWorkMock.Verify(u => u.CommitAsync(), Times.Once);
}

    // Should return null if task is not found by id
[TestMethod]
public async Task should_return_null_if_task_not_found_by_id()
{
    _repoMock.Setup(r => r.GetByIdAsync(It.IsAny<SurveillanceTaskId>())).ReturnsAsync((SurveillanceTask)null);

    // Act
    var result = await _survService.GetByIdAsync(new SurveillanceTaskId(Guid.NewGuid()));

    // Assert
    Assert.IsNull(result);
}

    // Should return null if status is not a valid enum value
[TestMethod]
public async Task should_return_null_if_status_not_valid_enum_value()
{

    // Act
    var result = await _survService.GetByStatusAsync("InvalidStatus");

    // Assert
    Assert.IsNull(result);
}

    // Should return null if user id is not a valid Guid
[TestMethod]
public async Task should_return_null_if_user_id_not_valid_guid()
{

    // Act
    var result = await _survService.GetByUserAsync("InvalidUserId");

    // Assert
    Assert.IsNull(result);
}

}