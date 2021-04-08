using System;
using System.Collections.Generic;
using System.Text;

namespace YouShare.Web.ViewModels
{
    public class BrowseViewModel
    {
        public IEnumerable<ProfileSearchViewModel> Profiles { get; set; }

        public IEnumerable<PostViewModel> Posts { get; set; }

        public int PageNumber { get; set; }

        public bool HasPreviousPage => this.PageNumber > 1;

        public int PreviousPageNumber => this.PageNumber - 1;

        public bool HasNextPage => this.PageNumber < this.PagesCount;

        public int NextPageNumber => this.PageNumber + 1;

        public int PagesCount => (int)Math.Ceiling((double)this.Items / this.ItemsPerPage);

        public int Items { get; set; }

        public int ItemsPerPage { get; set; }
    }
}
