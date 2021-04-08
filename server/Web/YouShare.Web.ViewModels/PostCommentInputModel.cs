using System.ComponentModel.DataAnnotations;

namespace YouShare.Web.ViewModels
{
    public class PostCommentInputModel
    {
        [Required]
        public int PostId { get; set; }

        [Required]
        [StringLength(100)]
        public string Text { get; set; }
    }
}
