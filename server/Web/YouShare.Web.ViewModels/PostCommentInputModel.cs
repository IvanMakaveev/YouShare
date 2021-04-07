using System.ComponentModel.DataAnnotations;

namespace YouShare.Web.ViewModels
{
    public class PostCommentInputModel
    {
        public int PostId { get; set; }

        [Required]
        [StringLength(100)]
        public string Text { get; set; }
    }
}
