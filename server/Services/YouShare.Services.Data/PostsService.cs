using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouShare.Data.Common.Repositories;
using YouShare.Data.Models;
using YouShare.Services.Mapping;
using YouShare.Web.ViewModels;

namespace YouShare.Services.Data
{
    public class PostsService : IPostsService
    {
        private readonly IDeletableEntityRepository<Post> postsRepository;
        private readonly IRepository<PostLike> postLikesRepository;
        private readonly IImagesService imagesService;

        public PostsService(
            IDeletableEntityRepository<Post> postsRepository,
            IRepository<PostLike> postLikesRepository,
            IImagesService imagesService)
        {
            this.postsRepository = postsRepository;
            this.postLikesRepository = postLikesRepository;
            this.imagesService = imagesService;
        }

        public async Task CreateAsync(int id, CreatePostInputModel input, string path)
        {
            var post = new Post()
            {
                ProfileId = id,
                Text = input.Text,
                Title = input.Title,
                IsPublic = input.IsPublic,
            };

            if (input.Image?.Length > 0)
            {
                post.ImageId = await this.imagesService.CreateAsync(input.Image, path);
            }

            await this.postsRepository.AddAsync(post);
            await this.postsRepository.SaveChangesAsync();
        }

        public async Task DeletePostFromProfileAsync(int profileId, int id)
        {
            var post = this.postsRepository.All().Where(x => x.Id == id && x.ProfileId == profileId).FirstOrDefault();
            if (post != null)
            {
                this.postsRepository.Delete(post);
                await this.postsRepository.SaveChangesAsync();
            }
        }

        public async Task DeleteAllPostsFromProfileAsync(int profileId)
        {
            var posts = this.postsRepository.All().Where(x => x.ProfileId == profileId).ToList();
            foreach (var post in posts)
            {
                this.postsRepository.Delete(post);
            }

            await this.postsRepository.SaveChangesAsync();
        }

        public async Task LikePostAsync(int profileId, int id)
        {
            var postLike = this.postLikesRepository.All().FirstOrDefault(x => x.PostId == id && x.ProfileId == profileId);
            if (postLike == null)
            {
                postLike = new PostLike()
                {
                    ProfileId = profileId,
                    PostId = id,
                };

                await this.postLikesRepository.AddAsync(postLike);
            }
            else
            {
                this.postLikesRepository.Delete(postLike);
            }

            await this.postLikesRepository.SaveChangesAsync();
        }

        public bool IsLiked(int postId, int accessorId)
            => this.postLikesRepository
            .AllAsNoTracking()
            .Any(x => x.PostId == postId && x.ProfileId == accessorId);

        public IEnumerable<T> GetProfilePosts<T>(int profileId, int pageNumber, int count = 20)
            => this.postsRepository
            .AllAsNoTracking()
            .Where(x => x.ProfileId == profileId)
            .OrderByDescending(x => x.CreatedOn)
            .Skip((pageNumber - 1) * count)
            .Take(count)
            .To<T>()
            .ToList();

        public IEnumerable<T> GetPublicProfilePosts<T>(int profileId, int pageNumber, int count = 20)
            => this.postsRepository
            .AllAsNoTracking()
            .Where(x => x.ProfileId == profileId && x.IsPublic == true)
            .OrderByDescending(x => x.CreatedOn)
            .Skip((pageNumber - 1) * count)
            .Take(count)
            .To<T>()
            .ToList();

        public int GetProfileTotalPosts(int profileId)
            => this.postsRepository
            .AllAsNoTracking()
            .Where(x => x.ProfileId == profileId)
            .Count();

        public int GetProfileTotalPublicPosts(int profileId)
            => this.postsRepository
            .AllAsNoTracking()
            .Where(x => x.ProfileId == profileId && x.IsPublic == true)
            .Count();

        public bool IsOwner(int postId, int accessorId)
        {
             return this.postsRepository.AllAsNoTracking().Any(x => x.Id == postId && x.ProfileId == accessorId);
        }
    }
}
