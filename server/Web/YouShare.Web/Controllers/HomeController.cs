namespace YouShare.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using System.Security.Claims;
    using YouShare.Services.Data;
    using YouShare.Web.ViewModels;

    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IProfilesService profilesService;
        private readonly IPostsService postsService;
        private readonly ICommentsService commentsService;
        private readonly IBrowseService browseService;

        public HomeController(
            IProfilesService profilesService,
            IPostsService postsService,
            ICommentsService commentsService,
            IBrowseService browseService)
        {
            this.profilesService = profilesService;
            this.postsService = postsService;
            this.commentsService = commentsService;
            this.browseService = browseService;
        }

        [HttpGet]
        [Authorize]
        [Route("{pageNumber:int}")]
        public IActionResult GetBrowseData(int pageNumber)
        {
            pageNumber = pageNumber < 1 ? 1 : pageNumber;

            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileId = this.profilesService.GetId(userId);

            var totalPostsCount = this.browseService.GetPostsCount(profileId);
            var newestPosts = this.browseService.GetNewestPosts<PostViewModel>(profileId, pageNumber, 10)
                .OrderByDescending(x => x.CreatedOn);

            var following = this.browseService.GetFollowing(profileId).OrderBy(x => x.Name).ToList();

            foreach (var post in newestPosts)
            {
                post.IsOwner = this.postsService.IsOwner(post.Id, profileId);
                post.IsLiked = this.postsService.IsLiked(post.Id, profileId);

                foreach (var comment in post.Comments)
                {
                    comment.IsLiked = this.commentsService.IsLiked(comment.Id, profileId);
                }

                post.Comments.OrderByDescending(x => x.CreatedOn);
            }

            var viewModel = new BrowseViewModel()
            {
                Following = following,
                Posts = newestPosts,
                PageNumber = pageNumber,
                ItemsPerPage = 20,
                Items = totalPostsCount,
            };

            return new JsonResult(viewModel);
        }
    }
}
