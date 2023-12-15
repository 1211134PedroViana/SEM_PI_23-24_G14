using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mpt.Domain.Authentication;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mpt.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly RoleService _roleService;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _config;

        public AuthController(AuthService authService, RoleService roleService, IConfiguration config, IWebHostEnvironment env)
        {
            this._authService = authService;
            this._roleService = roleService;
            this._env = env;
            this._config = config;
        }


        [AllowAnonymous]
        [HttpPost("login/")]
        public async Task<ActionResult<SystemUser>> Login(AuthSystemUserDTO newUser)
        {
            try
            {
                if (newUser.Email == null || newUser.Password == null)
                {
                    return BadRequest();
                }
                var user = await _authService.Login(newUser.Email, newUser.Password, Response);
                if (user != null)
                {
                    var role = await _roleService.GetByIdAsync(user.RoleId);
                    var jwt = _authService.GenerateJwtToken(user, role.Name);

                    SetCookie(jwt);

                    return Ok(user);
                }
                else
                {
                    return BadRequest(new { message = "Error Email or password invalid" });
                }

            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [AllowAnonymous]
        [HttpGet("session/")]
        public async Task<ActionResult<AuthSystemUserDTO>> Session()
        {
            try
            {
                var cName = GetCookieName();
                var token = Request.Cookies[cName];

                if(string.IsNullOrEmpty(token)) {
                    string authHeader = Request.Headers["Authorization"];
                    token = authHeader.Substring("Bearer ".Length).Trim();
                }

                if (!string.IsNullOrEmpty(token))
                {
                    var user = await _authService.Auth(token);
                    if (user != null)
                    {
                        return user;
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return BadRequest();
                } 
                   
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }


        [AllowAnonymous]
        [HttpPost("logout/")]
        public IActionResult LogOut()
        {
            try
            {

                _authService.Logout(Request, Response);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        private void SetCookie(string token)
        {
            var cName = GetCookieName();

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
                SameSite = SameSiteMode.None,
                Secure = false,
                Path = "/",
            };

            if (this._env.IsDevelopment())
            {
                cookieOptions.Secure = false;
                cookieOptions.SameSite = SameSiteMode.Lax;
                cookieOptions.Domain = "localhost";
            }

            Response.Cookies.Append(cName, token, cookieOptions);
        }

        private string GetCookieName() {
            return _config.GetValue<string>("AppSettings:CookieName");
        }

    }
}