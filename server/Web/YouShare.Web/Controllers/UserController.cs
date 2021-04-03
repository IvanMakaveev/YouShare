using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using YouShare.Data.Models;
using YouShare.Web.Settings;

namespace YouShare.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IOptions<JwtSettings> jwtSettings;

        public UserController(
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IOptions<JwtSettings> jwtSettings)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.jwtSettings = jwtSettings;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var asd = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return new JsonResult("hi");
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password, bool remember)
        {
            username = "IEMbg";
            password = "740506";

            var result = await this.signInManager.PasswordSignInAsync(username, password, true, false);
            if (!result.Succeeded)
            {
                return this.BadRequest();
            }

            var userid = this.userManager.FindByNameAsync(username).Result.Id;

            // Authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.jwtSettings.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                     new Claim(ClaimTypes.Name, username),
                     new Claim(ClaimTypes.NameIdentifier, userid),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                                new SymmetricSecurityKey(key),
                                SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenAsString = tokenHandler.WriteToken(token);

            this.Response.Cookies.Append("JwtToken", tokenAsString, new CookieOptions()
            {
                Expires = remember ? DateTime.MaxValue : DateTime.Now.AddDays(7),
                IsEssential = true,
                HttpOnly = true,
            });
            return new JsonResult(tokenAsString);
        }
    }
}
