using System;
using System.Threading.Tasks;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Test;

[TestClass]
public class PickupAndDeliveryTaskServiceTest
{

    private Mock<IUnitOfWork> _unitOfWorkMock;
    private Mock<IPickupAndDeliveryTaskRepository> _repoMock;
    private Mock<ISystemUserRepository> _userRepoMock;
    private PickupAndDeliveryTaskService _survService;

    [TestInitialize]
    public void Setup()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _userRepoMock = new Mock<ISystemUserRepository>();
        _repoMock = new Mock<IPickupAndDeliveryTaskRepository>();
        _survService = new PickupAndDeliveryTaskService(_unitOfWorkMock.Object, _repoMock.Object, _userRepoMock.Object);
    }

    
    // should return a list of all pickup and delivery tasks when GetAllAsync is called
[TestMethod]
public async Task test_get_all_async_returns_list_of_tasks()
{
    var tasks = new List<PickupAndDeliveryTask>
    {
        new PickupAndDeliveryTask(
            pickupPlace: "PickupLocation1",
            deliveryPlace: "DeliveryLocation1",
            pickupPersonName: "John Doe",
            pickupPersonPhoneNumber: "123-456-7890",
            deliveryPersonName: "Jane Doe",
            deliveryPersonPhoneNumber: "987-654-3210",
            description: "Delivery of goods",
            confirmationCode: "ABC123",
            userId: new SystemUserId(Guid.NewGuid())
        ),

        new PickupAndDeliveryTask(
            pickupPlace: "PickupLocation2",
            deliveryPlace: "DeliveryLocation2",
            pickupPersonName: "Alice Smith",
            pickupPersonPhoneNumber: "111-222-3333",
            deliveryPersonName: "Bob Johnson",
            deliveryPersonPhoneNumber: "444-555-6666",
            description: "Urgent delivery",
            confirmationCode: "XYZ789",
            userId: new SystemUserId(Guid.NewGuid())
        )
    };

    _repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(tasks);

    // Act
    var result = await _survService.GetAllAsync();

    // Assert
    Assert.AreEqual(tasks.Count, result.Count);
}

    // should return a pickup and delivery task when GetByIdAsync is called with a valid id
[TestMethod]
public async Task test_get_by_id_async_returns_task_with_valid_id()
{
    var task = new PickupAndDeliveryTask(
            pickupPlace: "PickupLocation2",
            deliveryPlace: "DeliveryLocation2",
            pickupPersonName: "Alice Smith",
            pickupPersonPhoneNumber: "111-222-3333",
            deliveryPersonName: "Bob Johnson",
            deliveryPersonPhoneNumber: "444-555-6666",
            description: "Urgent delivery",
            confirmationCode: "XYZ789",
            userId: new SystemUserId(Guid.NewGuid())
        );

    _repoMock.Setup(r => r.GetByIdAsync(task.Id)).ReturnsAsync(task);

    // Act
    var result = await _survService.GetByIdAsync(task.Id);

    // Assert
    Assert.IsNotNull(result);
    Assert.AreEqual(task.PickupPlace, result.PickupPlace);
}

    // should add a new pickup and delivery task when AddAsync is called with valid input
[TestMethod]
public async Task test_add_async_adds_new_task_with_valid_input()
{
    var user = new SystemUser("1210825@isep.ipp.pt", "12345", new RoleId("50c1bbcb-7c93-4794-aab0-c765d8b8903a"), "915368555", "123456789");
    var dto = new CreatePickupAndDeliveryTaskDTO(
            pickupPlace: "PickupLocation2",
            deliveryPlace: "DeliveryLocation2",
            pickupPersonName: "Alice Smith",
            pickupPersonPhoneNumber: "111-222-3333",
            deliveryPersonName: "Bob Johnson",
            deliveryPersonPhoneNumber: "444-555-6666",
            description: "Urgent delivery",
            confirmationCode: "XYZ789",
            userId: user.Id.AsString()
        );
    
    var task = new PickupAndDeliveryTask(
            pickupPlace: "PickupLocation2",
            deliveryPlace: "DeliveryLocation2",
            pickupPersonName: "Alice Smith",
            pickupPersonPhoneNumber: "111-222-3333",
            deliveryPersonName: "Bob Johnson",
            deliveryPersonPhoneNumber: "444-555-6666",
            description: "Urgent delivery",
            confirmationCode: "XYZ789",
            userId: user.Id
        );

    _userRepoMock.Setup(repo => repo.GetByIdAsync(user.Id)).ReturnsAsync(user);

    _repoMock.Setup(r => r.AddAsync(It.IsAny<PickupAndDeliveryTask>())).Callback<PickupAndDeliveryTask>(t => task = t);

    // Act
    var result = await _survService.AddAsync(dto);

    // Assert
    Assert.IsNotNull(result);
    Assert.AreEqual(dto.PickupPlace, task.PickupPlace);
}

    // should return null when GetByIdAsync is called with an invalid id
[TestMethod]
public async Task should_return_null_if_task_not_found_by_id()
{
    _repoMock.Setup(r => r.GetByIdAsync(It.IsAny<PickupAndDeliveryTaskId>())).ReturnsAsync((PickupAndDeliveryTask)null);

    // Act
    var result = await _survService.GetByIdAsync(new PickupAndDeliveryTaskId(Guid.NewGuid()));

    // Assert
    Assert.IsNull(result);
}

    // should return null when GetByStatusAsync is called with an invalid status
[TestMethod]
public async Task test_get_by_status_async_returns_null_with_invalid_status()
{
    var status = "InvalidStatus";

    // Act
    var result = await _survService.GetByStatusAsync(status);

    // Assert
    Assert.IsNull(result);
}

}