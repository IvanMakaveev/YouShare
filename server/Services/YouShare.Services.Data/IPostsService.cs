namespace YouShare.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using YouShare.Web.ViewModels;

    public interface IPostsService
    {
        Task CreateAsync(int id, CreatePostInputModel input, string path);

        Task LikePostAsync(int profileId, int id);

        Task DeletePostFromProfileAsync(int profileId, int id);

        Task DeleteAllPostsFromProfileAsync(int profileId);

        bool IsLiked(int postId, int accessorId);

        bool IsOwner(int postId, int accessorId);

        IEnumerable<T> GetProfilePosts<T>(int profileId, int pageNumber, int count = 20);

        IEnumerable<T> GetPublicProfilePosts<T>(int profileId, int pageNumber, int count = 20);

        int GetProfileTotalPosts(int profileId);

        int GetProfileTotalPublicPosts(int profileId);
    }
}
