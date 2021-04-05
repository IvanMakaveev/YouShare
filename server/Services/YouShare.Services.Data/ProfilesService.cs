namespace YouShare.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using YouShare.Data.Common.Repositories;
    using YouShare.Data.Models;
    using YouShare.Data.Models.Enums;
    using YouShare.Services.Mapping;
    using Microsoft.EntityFrameworkCore;
    using YouShare.Web.ViewModels;
    using YouShare.Web.ViewModels.Profiles;

    public class ProfilesService : IProfilesService
    {
        private readonly IDeletableEntityRepository<Profile> profileRepository;
        private readonly IRepository<Country> countriesRepository;
        private readonly IRepository<ProfileFollower> followersRepository;
        private readonly IImagesService imagesService;

        public ProfilesService(
            IDeletableEntityRepository<Profile> profileRepository,
            IRepository<Country> countriesRepository,
            IRepository<ProfileFollower> followersRepository,
            IImagesService imagesService)
        {
            this.profileRepository = profileRepository;
            this.countriesRepository = countriesRepository;
            this.followersRepository = followersRepository;
            this.imagesService = imagesService;
        }

        public int GetId(string userId)
            => this.profileRepository
            .AllAsNoTracking()
            .Where(x => x.User.Id == userId)
            .Select(x => x.Id)
            .FirstOrDefault();

        public async Task<int> CreateAsync(RegisterInputModel input)
        {
            this.ValidateCountryId(input.Country);

            var gender = this.GetGender(input.Gender);

            var profile = new Profile()
            {
                BirthDay = input.BirthDate,
                FirstName = input.FirstName,
                LastName = input.LastName,
                Gender = gender,
                CountryId = input.Country,
            };

            await this.profileRepository.AddAsync(profile);
            await this.profileRepository.SaveChangesAsync();

            return profile.Id;
        }

        public async Task UpdateAsync(string id, EditProfileInputModel input, string path)
        {
            var profile = this.profileRepository.All().FirstOrDefault(x => x.User.Id == id);

            if (profile != null)
            {
                this.ValidateCountryId(input.Country);

                var gender = this.GetGender(input.Gender);

                profile.FirstName = input.FirstName;
                profile.LastName = input.LastName;
                profile.Gender = gender;
                profile.BirthDay = input.BirthDate;
                profile.About = input.About;
                profile.CountryId = input.Country;

                if (input.Image?.Length > 0)
                {
                    profile.ImageId = await this.imagesService.CreateAsync(input.Image, path);
                }

                this.profileRepository.Update(profile);
                await this.profileRepository.SaveChangesAsync();
            }
        }

        public T GetById<T>(int id)
            => this.profileRepository
            .AllAsNoTracking()
            .Where(x => x.Id == id)
            .To<T>()
            .FirstOrDefault();

        public T GetByUserId<T>(string id)
            => this.profileRepository
            .AllAsNoTracking()
            .Where(x => x.User.Id == id)
            .To<T>()
            .FirstOrDefault();

        public bool IsFollowing(int profileId, int accessorId)
            => this.followersRepository
            .AllAsNoTracking()
            .Any(x => x.ProfileId == profileId && x.FollowerId == accessorId);

        public async Task FollowProfileAsync(int profileId, int senderId)
        {
            if (senderId != profileId)
            {
                var followRelation = this.followersRepository.All().FirstOrDefault(x => x.FollowerId == senderId && x.ProfileId == profileId);
                if (followRelation == null)
                {
                    await this.followersRepository.AddAsync(new ProfileFollower
                    {
                        ProfileId = profileId,
                        FollowerId = senderId,
                    });
                }
                else
                {
                    this.followersRepository.Delete(followRelation);
                }

                await this.followersRepository.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var profile = this.profileRepository.All().Where(x => x.Id == id).FirstOrDefault();
            if (profile != null)
            {
                //await this.postsService.DeleteAllPostsFromProfileAsync(id);
                //await this.commentsService.DeleteAllCommentsFromProfileAsync(id);

                this.profileRepository.Delete(profile);
                await this.profileRepository.SaveChangesAsync();
            }
        }

        private Gender GetGender(string genderValue)
        {
            Enum.TryParse<Gender>(genderValue, out Gender gender);
            if (gender == 0)
            {
                throw new ArgumentException("The selected Gender must be valid");
            }

            return gender;
        }

        private void ValidateCountryId(int id)
        {
            if (this.countriesRepository.AllAsNoTracking().FirstOrDefault(x => x.Id == id) == null)
            {
                throw new ArgumentException("The selected Country must be valid");
            }
        }
    }
}
