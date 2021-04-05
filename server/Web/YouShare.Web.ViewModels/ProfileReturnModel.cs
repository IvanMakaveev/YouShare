using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using YouShare.Services.Mapping;

namespace YouShare.Web.ViewModels
{
    public class ProfileReturnModel : IMapFrom<Data.Models.Profile>, IHaveCustomMappings
    {
        public int Id { get; set; }

        [IgnoreMap]
        public bool IsOwner { get; set; }

        [IgnoreMap]
        public bool IsFollowing { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public DateTime BirthDay { get; set; }

        public string About { get; set; }

        public string ImagePath { get; set; }

        public string CountryName { get; set; }

        public int FollowersCount { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Data.Models.Profile, ProfileReturnModel>()
                .ForMember(x => x.Gender, opt =>
                    opt.MapFrom(x => x.Gender.ToString()))
                .ForMember(x => x.ImagePath, opt =>
                    opt.MapFrom(x => "https://localhost:44319/img/users/" + (x.Image == null ? $"default.png" : $"{x.Image.Id}.{x.Image.Extension}")));
        }
    }
}
