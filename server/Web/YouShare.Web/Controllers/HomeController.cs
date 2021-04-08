namespace YouShare.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
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
                Profiles = following,
                Posts = newestPosts,
                PageNumber = pageNumber,
                ItemsPerPage = 20,
                Items = totalPostsCount,
            };

            return new JsonResult(viewModel);
        }

        [HttpGet]
        [Route("{pageNumber:int}/{searchText}")]
        public IActionResult Search(int pageNumber, string searchText)
        {
            if (searchText != null && searchText.Length > 0)
            {
                pageNumber = pageNumber < 1 ? 1 : pageNumber;

                var searchTokens = searchText.ToLower().Split(" ", StringSplitOptions.RemoveEmptyEntries);

                var viewModel = new BrowseViewModel();

                if (this.User.Identity.IsAuthenticated)
                {
                    var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
                    var profileId = this.profilesService.GetId(userId);

                    viewModel.Posts = this.browseService.SearchPosts<PostViewModel>(searchTokens, pageNumber);
                    viewModel.Items = this.browseService.GetSearchCount(searchTokens);

                    foreach (var post in viewModel.Posts)
                    {
                        post.IsOwner = this.postsService.IsOwner(post.Id, profileId);
                        post.IsLiked = this.postsService.IsLiked(post.Id, profileId);

                        foreach (var comment in post.Comments)
                        {
                            comment.IsLiked = this.commentsService.IsLiked(comment.Id, profileId);
                        }

                        post.Comments.OrderByDescending(x => x.CreatedOn);
                    }
                }
                else
                {
                    viewModel.Posts = this.browseService.SearchPublicPosts<PostViewModel>(searchTokens, pageNumber);
                    viewModel.Items = this.browseService.GetSearchPublicCount(searchTokens);

                    foreach (var post in viewModel.Posts)
                    {
                        post.IsOwner = false;
                        post.IsLiked = false;

                        foreach (var comment in post.Comments)
                        {
                            comment.IsLiked = false;
                        }

                        post.Comments.OrderByDescending(x => x.CreatedOn);
                    }
                }

                viewModel.Profiles = this.browseService.SearchProfiles<ProfileSearchViewModel>(searchTokens, pageNumber);
                viewModel.PageNumber = pageNumber;
                viewModel.ItemsPerPage = 20;

                return new JsonResult(viewModel);
            }

            return this.BadRequest();
        }
    }
}
