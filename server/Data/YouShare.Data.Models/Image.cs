namespace YouShare.Data.Models
{
    using System;
    using System.Collections.Generic;

    using YouShare.Data.Common.Models;

    public class Image : BaseModel<string>
    {
        public Image()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Profiles = new HashSet<Profile>();
            this.Posts = new HashSet<Post>();
        }

        public string Extension { get; set; }

        public virtual ICollection<Profile> Profiles { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
