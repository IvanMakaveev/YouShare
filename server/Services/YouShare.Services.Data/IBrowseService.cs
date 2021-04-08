using System;
using System.Collections.Generic;
using System.Text;
using YouShare.Web.ViewModels;

namespace YouShare.Services.Data
{
    public interface IBrowseService
    {
        IEnumerable<T> GetNewestPosts<T>(int profileId, int pageNumber, int count = 20);

        IEnumerable<ProfileSearchViewModel> GetFollowing(int profileId);

        int GetPostsCount(int profileId);

        IEnumerable<T> SearchPosts<T>(string[] searchTokens, int pageNumber, int count = 20);

        IEnumerable<T> SearchPublicPosts<T>(string[] searchTokens, int pageNumber, int count = 20);

        IEnumerable<T> SearchProfiles<T>(string[] searchTokens, int pageNumber, int count = 20);

        int GetSearchCount(string[] searchTokens);

        int GetSearchPublicCount(string[] searchTokens);
    }
}
