using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using YouShare.Services.Data;
using YouShare.Web.ViewModels;
using YouShare.Web.ViewModels.Profiles;

namespace YouShare.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfilesController : ControllerBase
    {
        private readonly IProfilesService profilesService;
        private readonly IWebHostEnvironment webHost;

        public ProfilesController(
            IProfilesService profilesService,
            IWebHostEnvironment webHost)
        {
            this.profilesService = profilesService;
            this.webHost = webHost;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetProfile(int id)
        {
            var viewModel = this.profilesService.GetById<ProfileReturnModel>(id);

            if (viewModel == null)
            {
                return this.NotFound();
            }

            var userid = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileId = this.profilesService.GetId(userid);
            viewModel.IsOwner = profileId == id;

            if (!viewModel.IsOwner)
            {
                viewModel.IsFollowing = this.profilesService.IsFollowing(id, profileId);
            }

            return new JsonResult(viewModel);
        }

        [HttpPost]
        [Authorize]
        [Route("[action]/{id:int}")]
        public async Task<IActionResult> Follow(int id)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileId = this.profilesService.GetId(userId);

            await this.profilesService.FollowProfileAsync(id, profileId);

            return this.Ok();
        }

        [HttpPost]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Edit(int id, [FromForm] EditProfileInputModel input)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileId = this.profilesService.GetId(userId);

            if (profileId != id)
            {
                return this.Unauthorized();
            }

            try
            {
                await this.profilesService.UpdateAsync(userId, input, $"{this.webHost.WebRootPath}/img/users");
            }
            catch (ArgumentException ae)
            {
                this.ModelState.AddModelError(string.Empty, ae.Message);

                return this.BadRequest(this.ModelState);
            }

            return this.Ok();
        }
    }
}
