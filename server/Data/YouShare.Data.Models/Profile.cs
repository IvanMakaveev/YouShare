namespace YouShare.Data.Models
{
    using System;
    using System.Collections.Generic;

    using YouShare.Data.Common.Models;
    using YouShare.Data.Models.Enums;

    public class Profile : BaseDeletableModel<int>
    {
        public Profile()
        {
            this.PostLikes = new HashSet<PostLike>();
            this.Comments = new HashSet<Comment>();
            this.CommentLikes = new HashSet<CommentLike>();
            this.Posts = new HashSet<Post>();
            this.Following = new HashSet<ProfileFollower>();
            this.Followers = new HashSet<ProfileFollower>();
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Gender Gender { get; set; }

        public DateTime BirthDay { get; set; }

        public string About { get; set; }

        public string ImageId { get; set; }

        public virtual Image Image { get; set; }

        public int CountryId { get; set; }

        public virtual Country Country { get; set; }

        public virtual ICollection<PostLike> PostLikes { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<CommentLike> CommentLikes { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<ProfileFollower> Followers { get; set; }

        public virtual ICollection<ProfileFollower> Following { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
