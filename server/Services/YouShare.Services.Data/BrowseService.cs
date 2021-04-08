using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YouShare.Data.Common.Repositories;
using YouShare.Data.Models;
using YouShare.Services.Mapping;
using YouShare.Web.ViewModels;

namespace YouShare.Services.Data
{
    public class BrowseService : IBrowseService
    {
        private readonly IDeletableEntityRepository<Post> postsRepository;
        private readonly IDeletableEntityRepository<Profile> profilesRepository;
        private readonly IRepository<ProfileFollower> profileFollowersRepository;

        public BrowseService(
            IDeletableEntityRepository<Post> postRepository,
            IDeletableEntityRepository<Profile> profileRepository,
            IRepository<ProfileFollower> profileFollowersRepository)
        {
            this.postsRepository = postRepository;
            this.profilesRepository = profileRepository;
            this.profileFollowersRepository = profileFollowersRepository;
        }

        public IEnumerable<ProfileSearchViewModel> GetFollowing(int profileId)
        {
            var profiles = this.profileFollowersRepository.AllAsNoTracking()
                .Where(x => x.FollowerId == profileId)
                .Select(x => new ProfileSearchViewModel()
                {
                    Id = x.ProfileId,
                    Name = $"{x.Profile.FirstName} {x.Profile.LastName}",
                    ImagePath = "https://localhost:44319/img/users/" + (x.Profile.Image == null ? "default.png" : $"{x.Profile.Image.Id}.{x.Profile.Image.Extension}"),
                })
                .ToList();

            return profiles;
        }

        public IEnumerable<T> GetNewestPosts<T>(int profileId, int pageNumber, int count = 20)
        {
            var postsFromProfiles = this.profilesRepository.AllAsNoTracking()
                .Where(x => x.Id == profileId)
                .SelectMany(x => x.Following
                    .SelectMany(x => x.Profile.Posts))
                .OrderByDescending(x => x.CreatedOn)
                .Skip((pageNumber - 1) * count)
                .Take(count)
                .To<T>()
                .ToList();

            return postsFromProfiles;
        }

        public int GetPostsCount(int profileId)
        {
            var postsFromProfiles = this.profilesRepository.AllAsNoTracking()
                .Where(x => x.Id == profileId)
                .SelectMany(x => x.Following
                    .SelectMany(x => x.Profile.Posts)).Count();

            return postsFromProfiles;
        }

        public int GetSearchCount(string[] searchTokens)
        {
            var postsCountResults = 0;
            var profilesCountResults = 0;

            foreach (var search in searchTokens)
            {
                postsCountResults += this.postsRepository.AllAsNoTracking()
                    .Where(x => x.Text.ToLower().Contains(search) || x.Title.ToLower().Contains(search)).Count();

                profilesCountResults += this.profilesRepository.AllAsNoTracking()
                    .Where(x => x.FirstName.ToLower().Contains(search) || x.LastName.ToLower().Contains(search)).Count();
            }

            return Math.Max(postsCountResults, profilesCountResults);
        }

        public IEnumerable<T> SearchPosts<T>(string[] searchTokens, int pageNumber, int count = 20)
        {
            var results = new List<T>();

            foreach (var search in searchTokens)
            {
                results.AddRange(this.postsRepository.AllAsNoTracking()
                .Where(x => x.Text.ToLower().Contains(search) || x.Title.ToLower().Contains(search))
                .OrderByDescending(x => x.CreatedOn)
                .Skip((pageNumber - 1) * count)
                .Take(count)
                .To<T>()
                .ToList());
            }

            return results;
        }

        public IEnumerable<T> SearchProfiles<T>(string[] searchTokens, int pageNumber, int count = 20)
        {
            var results = new List<T>();

            foreach (var search in searchTokens)
            {
                results.AddRange(this.profilesRepository.AllAsNoTracking()
                .Where(x => x.FirstName.ToLower().Contains(search) || x.LastName.ToLower().Contains(search))
                .OrderByDescending(x => x.CreatedOn)
                .Skip((pageNumber - 1) * count)
                .Take(count)
                .To<T>()
                .ToList());
            }

            return results;
        }

        public int GetSearchPublicCount(string[] searchTokens)
        {
            var postsCountResults = 0;
            var profilesCountResults = 0;

            foreach (var search in searchTokens)
            {
                postsCountResults += this.postsRepository.AllAsNoTracking()
                    .Where(x => (x.Text.ToLower().Contains(search) || x.Title.ToLower().Contains(search)) && x.IsPublic == true).Count();

                profilesCountResults += this.profilesRepository.AllAsNoTracking()
                    .Where(x => x.FirstName.ToLower().Contains(search) || x.LastName.ToLower().Contains(search)).Count();
            }

            return Math.Max(postsCountResults, profilesCountResults);
        }

        public IEnumerable<T> SearchPublicPosts<T>(string[] searchTokens, int pageNumber, int count = 20)
        {
            var results = new List<T>();

            foreach (var search in searchTokens)
            {
                results.AddRange(this.postsRepository.AllAsNoTracking()
                .Where(x => (x.Text.ToLower().Contains(search) || x.Title.ToLower().Contains(search)) && x.IsPublic == true)
                .OrderByDescending(x => x.CreatedOn)
                .Skip((pageNumber - 1) * count)
                .Take(count)
                .To<T>()
                .ToList());
            }

            return results;
        }
    }
}
