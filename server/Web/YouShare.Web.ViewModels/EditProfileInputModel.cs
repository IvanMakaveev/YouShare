namespace YouShare.Web.ViewModels.Profiles
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    using AutoMapper;
    using YouShare.Services.Mapping;
    using YouShare.Web.Infrastructure.Attributes;

    using Microsoft.AspNetCore.Http;
    using System;

    public class EditProfileInputModel
    {
        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 2)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public int Country { get; set; }

        [StringLength(250, ErrorMessage = "{0} must be at most {1} characters long.")]
        public string About { get; set; }

        [IgnoreMap]
        [ImageValidation]
        public IFormFile Image { get; set; }
    }
}
