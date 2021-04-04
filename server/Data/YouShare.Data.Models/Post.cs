namespace YouShare.Data.Models
{
    using System.Collections.Generic;

    using YouShare.Data.Common.Models;

    public class Post : BaseDeletableModel<int>
    {
        public Post()
        {
            this.Comments = new HashSet<Comment>();
            this.PostLikes = new HashSet<PostLike>();
        }

        public string Title { get; set; }

        public string Text { get; set; }

        public bool IsPublic { get; set; }

        public string ImageId { get; set; }

        public virtual Image Image { get; set; }

        public int ProfileId { get; set; }

        public virtual Profile Profile { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<PostLike> PostLikes { get; set; }
    }
}
