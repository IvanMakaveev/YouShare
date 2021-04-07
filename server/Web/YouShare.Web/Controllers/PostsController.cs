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
        private readonly ICommentsService commentsService;
        private readonly IWebHostEnvironment webHost;

        public PostsController(
            IPostsService postsService,
            IProfilesService profilesService,
            ICommentsService commentsService,
            IWebHostEnvironment webHost)
        {
            this.postsService = postsService;
            this.profilesService = profilesService;
            this.commentsService = commentsService;
            this.webHost = webHost;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetPosts(int id, int pageNumber)
        {
            var viewModel = new DisplayPostsViewmodel();

            pageNumber = pageNumber < 1 ? 1 : pageNumber;

            if (this.User.Identity.IsAuthenticated)
            {
                var postsViewModel = this.postsService.GetProfilePosts<PostViewModel>(id, pageNumber);
                var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var profileId = this.profilesService.GetId(userId);

                foreach (var post in postsViewModel)
                {
                    post.IsOwner = this.postsService.IsOwner(post.Id, profileId);
                    post.IsLiked = this.postsService.IsLiked(post.Id, profileId);

                    foreach (var comment in post.Comments)
                    {
                        comment.IsLiked = this.commentsService.IsLiked(comment.Id, profileId);
                    }

                    post.Comments.OrderByDescending(x => x.CreatedOn);
                }

                viewModel.Posts = postsViewModel;
                viewModel.Items = this.postsService.GetProfileTotalPosts(id);
            }
            else
            {
                var postsViewModel = this.postsService.GetPublicProfilePosts<PostViewModel>(id, pageNumber);

                foreach (var post in postsViewModel)
                {
                    post.IsOwner = false;
                    post.IsLiked = false;

                    foreach (var comment in post.Comments)
                    {
                        comment.IsLiked = false;
                    }

                    post.Comments.OrderByDescending(x => x.CreatedOn);
                }

                viewModel.Posts = postsViewModel;
                viewModel.Items = this.postsService.GetProfileTotalPublicPosts(id);
            }

            viewModel.PageNumber = pageNumber;
            viewModel.ItemsPerPage = 20;

            return new JsonResult(viewModel);
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

        [HttpPost]
        [Authorize]
        [Route("[action]/{id:int}")]
        public async Task<IActionResult> LikePost(int id)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileId = this.profilesService.GetId(userId);

            await this.postsService.LikePostAsync(profileId, id);

            return this.Ok();
        }
    }
}
