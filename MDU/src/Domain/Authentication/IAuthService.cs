using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mpt.Domain.SystemUsers;

namespace Mpt.Domain.Authentication
{
    public interface IAuthService
    {
        Task<SystemUser> Login(string Email, string Password, HttpResponse Response);
        Task<AuthSystemUserDTO> Auth(string token);
        string GenerateJwtToken(SystemUser user, string role);
        void Logout(HttpRequest Request, HttpResponse Response);
    }
}