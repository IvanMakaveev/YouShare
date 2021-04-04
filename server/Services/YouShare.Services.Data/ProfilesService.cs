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

    public class ProfilesService : IProfilesService
    {
        private readonly IDeletableEntityRepository<Profile> profileRepository;
        private readonly IRepository<Country> countriesRepository;
        private readonly IRepository<ProfileFollower> followersRepository;

        public ProfilesService(
            IDeletableEntityRepository<Profile> profileRepository,
            IRepository<Country> countriesRepository,
            IRepository<ProfileFollower> followersRepository)
        {
            this.profileRepository = profileRepository;
            this.countriesRepository = countriesRepository;
            this.followersRepository = followersRepository;
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
