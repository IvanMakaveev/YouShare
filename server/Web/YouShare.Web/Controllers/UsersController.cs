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
using YouShare.Services.Data;
using YouShare.Web.Settings;
using YouShare.Web.ViewModels;

namespace YouShare.Web.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UsersController : ControllerBase
    {
        private readonly IProfilesService profilesService;
        private readonly ICountriesService countriesService;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IOptions<JwtSettings> jwtSettings;

        public UsersController(
            IProfilesService profilesService,
            ICountriesService countriesService,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IOptions<JwtSettings> jwtSettings)
        {
            this.profilesService = profilesService;
            this.countriesService = countriesService;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.jwtSettings = jwtSettings;
        }

        [HttpGet]
        public IActionResult Countries()
        {
            var countries = this.countriesService.GetAllAsKvp();

            return new JsonResult(countries);
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterInputModel input)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var profileId = 0;
            var exceptionMessage = string.Empty;

            try
            {
                profileId = await this.profilesService.CreateAsync(input);
            }
            catch (Exception e)
            {
                exceptionMessage = e.Message;
            }

            if (exceptionMessage == string.Empty)
            {
                var user = new ApplicationUser { UserName = input.Username, Email = input.Email, ProfileId = profileId };
                var result = await this.userManager.CreateAsync(user, input.Password);
                if (result.Succeeded)
                {
                    var tokenAsString = this.GenerateToken(input.Username);
                    return new JsonResult(tokenAsString);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        this.ModelState.AddModelError(string.Empty, error.Description);
                    }

                    return this.BadRequest(this.ModelState);
                }
            }
            else
            {
                this.ModelState.AddModelError(string.Empty, exceptionMessage);

                return this.BadRequest(this.ModelState);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginInputModel input)
        {
            var result = await this.signInManager.PasswordSignInAsync(input.Username, input.Password, true, false);
            if (!result.Succeeded)
            {
                this.ModelState.AddModelError(string.Empty, "Invalid Username and Password combination.");
                return this.BadRequest(this.ModelState);
            }

            var tokenAsString = this.GenerateToken(input.Username);

            return new JsonResult(tokenAsString);
        }

        private string GenerateToken(string username)
        {
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

            return tokenAsString;
        }
    }
}
