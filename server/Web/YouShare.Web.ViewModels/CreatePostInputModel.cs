namespace YouShare.Web.ViewModels
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Microsoft.AspNetCore.Http;
    using YouShare.Web.Infrastructure.Attributes;

    public class CreatePostInputModel
    {
        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
        public string Title { get; set; }

        [Required]
        [StringLength(750, ErrorMessage = "{0} must be at most {1} characters long.")]
        public string Text { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        [ImageValidation]
        public IFormFile Image { get; set; }
    }
}
