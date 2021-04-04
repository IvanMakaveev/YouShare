namespace YouShare.Services.Data
{
    using System.Collections.Generic;

    public interface ICountriesService
    {
        IEnumerable<KeyValuePair<int, string>> GetAllAsKvp();
    }
}
