using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace YouShare.Web.ViewModels
{
    public class SearchInputModel
    {
        public int PageNumber { get; set; }

        [Required]
        public string SearchText { get; set; }
    }
}
