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
        string GenerateJwtToken(SystemUser user, string role);
        int ValidateTokenService(string Token);
        void Logout(HttpRequest Request, HttpResponse Response);
    }
}