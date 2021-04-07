using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YouShare.Data.Models;
using YouShare.Services.Mapping;

namespace YouShare.Web.ViewModels
{
    public class PostViewModel : IMapFrom<Post>, IHaveCustomMappings
    {
        public int Id { get; set; }

        [IgnoreMap]
        public bool IsOwner { get; set; }

        public string ProfileName { get; set; }

        public int ProfileId { get; set; }

        public string ProfileImage { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public string ImagePath { get; set; }

        public DateTime CreatedOn { get; set; }

        [IgnoreMap]
        public bool IsLiked { get; set; }

        public int Likes { get; set; }

        [IgnoreMap]
        public string CreatedOnString => this.CreatedOn.ToString("dd/MM/yyyy HH:mm");

        public List<PostCommentViewModel> Comments { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Post, PostViewModel>()
                .ForMember(x => x.ProfileName, opt =>
                    opt.MapFrom(x => $"{x.Profile.FirstName} {x.Profile.LastName}"))
                .ForMember(x => x.ProfileImage, opt =>
                    opt.MapFrom(x => "https://localhost:44319/img/users/" + (x.Profile.Image != null ? $"{x.Profile.Image.Id}.{x.Profile.Image.Extension}" : "default.png")))
                .ForMember(x => x.ImagePath, opt =>
                    opt.MapFrom(x => x.Image == null ? null : $"https://localhost:44319/img/posts/{x.Image.Id}.{x.Image.Extension}"))
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(x => x.PostLikes.Count()));
        }
    }
}
