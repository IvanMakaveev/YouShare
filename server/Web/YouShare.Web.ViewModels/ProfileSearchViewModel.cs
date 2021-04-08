using System;
using System.Collections.Generic;
using System.Text;
using YouShare.Data.Models;
using YouShare.Services.Mapping;

namespace YouShare.Web.ViewModels
{
    public class ProfileSearchViewModel : IMapFrom<Profile>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImagePath { get; set; }

        public void CreateMappings(AutoMapper.IProfileExpression configuration)
        {
            configuration.CreateMap<Profile, ProfileSearchViewModel>()
                .ForMember(x => x.Name, opt =>
                    opt.MapFrom(x => $"{x.FirstName} {x.LastName}"))
                .ForMember(x => x.ImagePath, opt =>
                    opt.MapFrom(x => "https://localhost:44319/img/users/" + (x.Image == null ? "default.png" : $"{x.Image.Id}.{x.Image.Extension}")));
        }
    }
}
