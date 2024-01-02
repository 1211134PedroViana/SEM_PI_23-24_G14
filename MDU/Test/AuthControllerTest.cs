using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Mpt.Domain.Authentication;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Controllers;
using Moq;

namespace Test
{
    [TestClass]
    public class AuthControllerTest
    {
        private WebApplicationFactory<Startup> _factory;

        [TestInitialize]
        public void Setup()
        {
            _factory = new WebApplicationFactory<Startup>();
        }

        [TestMethod]
        public async Task Test_Login_Valid_Credentials_Should_Return_Ok()
        {
            // Arrange
            var client = _factory.CreateClient();
            var authServiceMock = new Mock<AuthService>();
            var roleServiceMock = new Mock<RoleService>();

            authServiceMock.Setup(service => service.Login(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<HttpResponse>()))
                .ReturnsAsync(new SystemUser
                {
                });

            roleServiceMock.Setup(service => service.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Role
                {
                });

            var authController = new AuthController(authServiceMock.Object, roleServiceMock.Object, null, null);

            // Act
            var response = await client.PostAsJsonAsync("api/auth/login", new AuthSystemUserDTO
            {
                Email = "test@example.com",
                Password = "password123"
            });

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task Test_Session_With_Valid_Token_Should_Return_User()
        {
            // Arrange
            var client = _factory.CreateClient();
            var authServiceMock = new Mock<AuthService>();

            authServiceMock.Setup(service => service.Auth(It.IsAny<string>()))
                .ReturnsAsync(new AuthSystemUserDTO
                {
                   
                });

            var authController = new AuthController(authServiceMock.Object, null, null, null);

            // Act
            var response = await client.GetAsync("api/auth/session");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task Test_Logout_Should_Return_Ok()
        {
            // Arrange
            var client = _factory.CreateClient();
            var authServiceMock = new Mock<AuthService>();

            var authController = new AuthController(authServiceMock.Object, null, null, null);

            // Act
            var response = await client.PostAsync("api/auth/logout", null);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

    }
}
