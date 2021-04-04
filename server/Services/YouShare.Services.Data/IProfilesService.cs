namespace YouShare.Services.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using YouShare.Web.ViewModels;

    public interface IProfilesService
    {
        int GetId(string userId);

        T GetById<T>(int id);

        T GetByUserId<T>(string id);

        Task<int> CreateAsync(RegisterInputModel input);
    }
}
