using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YouShare.Data.Models;
using YouShare.Services.Mapping;

namespace YouShare.Web.ViewModels
{
    public class PostCommentViewModel : IMapFrom<Comment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public int ProfileId { get; set; }

        public string ProfileFirstName { get; set; }

        public string ProfileLastName { get; set; }

        public string Text { get; set; }

        public int Likes { get; set; }

        public DateTime CreatedOn { get; set; }

        [IgnoreMap]
        public bool IsLiked { get; set; }

        [IgnoreMap]
        public string CreatedOnString => this.CreatedOn.ToString("dd/MM/yyyy HH:mm");

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Comment, PostCommentViewModel>()
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(x => x.CommentLikes.Count()));
        }
    }

}
