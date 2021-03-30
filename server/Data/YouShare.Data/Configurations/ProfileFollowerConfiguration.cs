using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouShare.Data.Models;

namespace YouShare.Data.Configurations
{
    public class ProfileFollowerConfiguration : IEntityTypeConfiguration<ProfileFollower>
    {
        public void Configure(EntityTypeBuilder<ProfileFollower> builder)
        {
            builder
                .HasOne(x => x.Profile)
                .WithMany(x => x.Followers)
                .HasForeignKey(x => x.ProfileId);
            builder
                .HasOne(x => x.Follower)
                .WithMany(x => x.Following)
                .HasForeignKey(x => x.FollowerId);
        }
    }
}
