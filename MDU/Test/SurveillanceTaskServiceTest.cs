using System;
using Moq;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Shared;

namespace Test;

[TestClass]
public class SurveillanceTaskTest
{
    
    // Should be able to retrieve all surveillance tasks
[TestMethod]
public async Task should_retrieve_all_surveillance_tasks()
{
    // Arrange
    var unitOfWorkMock = new Mock<IUnitOfWork>();
    var repoMock = new Mock<ISurveillanceTaskRepository>();
    var userRepoMock = new Mock<ISystemUserRepository>();

    var surveillanceTasks = new List<SurveillanceTask>
    {
        new SurveillanceTask("Building1", "Floor1", "Start1", "End1", "1234567890", new SystemUserId(Guid.NewGuid())),
        new SurveillanceTask("Building2", "Floor2", "Start2", "End2", "0987654321", new SystemUserId(Guid.NewGuid()))
    };

    repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(surveillanceTasks);

    var service = new SurveillanceTaskService(unitOfWorkMock.Object, repoMock.Object, userRepoMock.Object);

    // Act
    var result = await service.GetAllAsync();

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
    // Arrange
    var unitOfWorkMock = new Mock<IUnitOfWork>();
    var repoMock = new Mock<ISurveillanceTaskRepository>();
    var userRepoMock = new Mock<ISystemUserRepository>();

    var taskId = Guid.NewGuid();
    var surveillanceTask = new SurveillanceTask("Building1", "Floor1", "Start1", "End1", "1234567890", new SystemUserId(Guid.NewGuid()));

    repoMock.Setup(r => r.GetByIdAsync(It.IsAny<SurveillanceTaskId>())).ReturnsAsync(surveillanceTask);

    var service = new SurveillanceTaskService(unitOfWorkMock.Object, repoMock.Object, userRepoMock.Object);

    // Act
    var result = await service.GetByIdAsync(new SurveillanceTaskId(taskId));

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
    // Arrange
    var unitOfWorkMock = new Mock<IUnitOfWork>();
    var repoMock = new Mock<ISurveillanceTaskRepository>();
    var userRepoMock = new Mock<ISystemUserRepository>();

    var taskId = Guid.NewGuid();
    var userId = new SystemUserId(Guid.NewGuid());
    var createDto = new CreateSurveillanceTaskDTO
    (
        "Building1",
        "Floor1",
        "Start1",
        "End1",
        "1234567890",
        userId.ToString()
    );

    var surveillanceTask = new SurveillanceTask(createDto.BuildingId, createDto.FloorId, createDto.StartPlace, createDto.EndPlace, createDto.PhoneNumber, userId);

    //repoMock.Setup(r => r.AddAsync(It.IsAny<SurveillanceTask>())).Returns(Task.CompletedTask);
    //unitOfWorkMock.Setup(u => u.CommitAsync()).Returns(Task.CompletedTask);

    var service = new SurveillanceTaskService(unitOfWorkMock.Object, repoMock.Object, userRepoMock.Object);

    // Act
    var result = await service.AddAsync(createDto);

    // Assert
    Assert.IsNotNull(result);
    Assert.AreEqual(surveillanceTask.Id.AsGuid(), result.Id);
    Assert.AreEqual(surveillanceTask.BuildingId, result.BuildingId);
    Assert.AreEqual(surveillanceTask.FloorId, result.FloorId);
    Assert.AreEqual(surveillanceTask.StartPlace, result.StartPlace);
    Assert.AreEqual(surveillanceTask.EndPlace, result.EndPlace);
    Assert.AreEqual(surveillanceTask.PhoneNumber, result.PhoneNumber);
    Assert.AreEqual(surveillanceTask.Status, result.Status);

    repoMock.Verify(r => r.AddAsync(It.IsAny<SurveillanceTask>()), Times.Once);
    unitOfWorkMock.Verify(u => u.CommitAsync(), Times.Once);
}

    // Should return null if task is not found by id
[TestMethod]
public async Task should_return_null_if_task_not_found_by_id()
{
    // Arrange
    var unitOfWorkMock = new Mock<IUnitOfWork>();
    var repoMock = new Mock<ISurveillanceTaskRepository>();
    var userRepoMock = new Mock<ISystemUserRepository>();

    repoMock.Setup(r => r.GetByIdAsync(It.IsAny<SurveillanceTaskId>())).ReturnsAsync((SurveillanceTask)null);

    var service = new SurveillanceTaskService(unitOfWorkMock.Object, repoMock.Object, userRepoMock.Object);

    // Act
    var result = await service.GetByIdAsync(new SurveillanceTaskId(Guid.NewGuid()));

    // Assert
    Assert.IsNull(result);
}

    // Should return null if status is not a valid enum value
[TestMethod]
public async Task should_return_null_if_status_not_valid_enum_value()
{
    // Arrange
    var unitOfWorkMock = new Mock<IUnitOfWork>();
    var repoMock = new Mock<ISurveillanceTaskRepository>();
    var userRepoMock = new Mock<ISystemUserRepository>();

    var service = new SurveillanceTaskService(unitOfWorkMock.Object, repoMock.Object, userRepoMock.Object);

    // Act
    var result = await service.GetByStatusAsync("InvalidStatus");

    // Assert
    Assert.IsNull(result);
}

    // Should return null if user id is not a valid Guid
[TestMethod]
public async Task should_return_null_if_user_id_not_valid_guid()
{
    // Arrange
    var unitOfWorkMock = new Mock<IUnitOfWork>();
    var repoMock = new Mock<ISurveillanceTaskRepository>();
    var userRepoMock = new Mock<ISystemUserRepository>();

    var service = new SurveillanceTaskService(unitOfWorkMock.Object, repoMock.Object, userRepoMock.Object);

    // Act
    var result = await service.GetByUserAsync("InvalidUserId");

    // Assert
    Assert.IsNull(result);
}

}