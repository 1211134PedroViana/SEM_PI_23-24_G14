using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Mpt.Domain.SystemUsers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mpt.Domain.Authentication
{
    class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;
        private readonly IServiceScopeFactory _scopeFactory;

        public JwtMiddleware(RequestDelegate next, IConfiguration config, IServiceScopeFactory scopeFactory)
        {
            _next = next;
            _config = config;
            _scopeFactory = scopeFactory;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Cookies["CookieOnee-chanUwU"];
            if (!string.IsNullOrEmpty(token))
            {
                context.Request.Headers.Append("Authorization", "Bearer " + token);
                AttachUserToContext(context, token);
            }

            await _next(context);
        }

        private async Task AttachUserToContext(HttpContext context, string token)
        {
            using (var scope = _scopeFactory.CreateScope())
            {

                //Verifica o token
            try
            {
                var secret = _config.GetValue<string>("AppSettings:Secret");
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "unique_name").Value);
                var userService = scope.ServiceProvider.GetRequiredService<SystemUserService>();
                var user = await userService.GetByIdAsync(new SystemUserId(userId));
                // Attach user to context on successful jwt validation
                context.Items["user"] = user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to validate cookie. {ex.Message}");
            }

            }
        
        }

    }
}