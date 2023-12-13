using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
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

        public JwtMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _config = config;
        }

        public async Task Invoke(HttpContext context, SystemUserService systemUserService)
        {
            var token = context.Request.Cookies["token"];
            var tokenRefresh = context.Request.Cookies["tokenRefresh"];

            if (!string.IsNullOrEmpty(token) || !string.IsNullOrEmpty(tokenRefresh))
            {
                context.Request.Headers.Append("Authorization", "Bearer " + token);
                AttachUserToContext(context, systemUserService, token, tokenRefresh);
            }

            await _next(context);



        }

        private void AttachUserToContext(HttpContext context, SystemUserService systemUserService, string token, string tokenRefresh)
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
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "unique_name").Value);

                // attach user to context on successful jwt validation
                //context.Items["Utilizador"] = utilizadorService.GetUtilizadorById(userId);

            }
            catch
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }

            //Verifica o token refresh
            try
            {
                var secret = _config.GetValue<string>("AppSettings:Secret");
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secret);
                tokenHandler.ValidateToken(tokenRefresh, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

            }
            catch
            {
                //Se falhar aqui, remove o user que foi anexado ao context no passo anterior
                //context.Items["Utilizador"] = null;
            }
        }

    }
}