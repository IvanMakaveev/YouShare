using Microsoft.AspNetCore.Authorization;
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
    public class CommentsController : ControllerBase
    {
        private readonly IProfilesService profilesService;
        private readonly ICommentsService commentsService;

        public CommentsController(
            IProfilesService profilesService,
            ICommentsService commentsService)
        {
            this.profilesService = profilesService;
            this.commentsService = commentsService;
        }

        [HttpPost]
        [Authorize]
        [Route("[action]/{id:int}")]
        public async Task<IActionResult> LikeComment(int id)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileId = this.profilesService.GetId(userId);

            await this.commentsService.LikeCommentAsync(id, profileId);

            return this.Ok();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddComment(PostCommentInputModel input)
        {
            if (this.ModelState.IsValid)
            {
                var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var profileId = this.profilesService.GetId(userId);

                var viewModel = await this.commentsService.AddCommentAsync<PostCommentInputModel>(profileId, input);
                return new JsonResult(viewModel);
            }

            return this.BadRequest();
        }
    }
}
