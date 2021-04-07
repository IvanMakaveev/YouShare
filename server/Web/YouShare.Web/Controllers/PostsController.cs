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

namespace YouShare.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostsService postsService;
        private readonly IProfilesService profilesService;
        private readonly IWebHostEnvironment webHost;

        public PostsController(
            IPostsService postsService,
            IProfilesService profilesService,
            IWebHostEnvironment webHost)
        {
            this.postsService = postsService;
            this.profilesService = profilesService;
            this.webHost = webHost;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateForProfile([FromForm]CreatePostInputModel input)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileId = this.profilesService.GetId(userId);

            try
            {
                await this.postsService.CreateAsync(profileId, input, $"{this.webHost.WebRootPath}/img/posts");
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
