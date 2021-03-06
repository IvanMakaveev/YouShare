namespace YouShare.Data.Models
{
    using YouShare.Data.Common.Models;

    public class CommentLike : BaseModel<int>
    {
        public int CommentId { get; set; }

        public virtual Comment Comment { get; set; }

        public int ProfileId { get; set; }

        public virtual Profile Profile { get; set; }
    }
}
