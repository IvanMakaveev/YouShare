namespace YouShare.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using YouShare.Web.ViewModels;

    public interface ICommentsService
    {
        Task<PostCommentViewModel> AddCommentAsync<T>(int profileId, PostCommentInputModel input);

        Task LikeCommentAsync(int commentId, int profileId);

        Task DeleteAllCommentsFromProfileAsync(int profileId);

        Task DeleteAsync(int id);

        bool IsLiked(int commentId, int accessorId);

        IEnumerable<T> GetAllComments<T>();
    }
}
