namespace YouShare.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;

    using YouShare.Data.Common.Repositories;
    using YouShare.Data.Models;

    public class CountriesService : ICountriesService
    {
        private readonly IRepository<Country> countriesRepository;

        public CountriesService(IRepository<Country> countriesRepository)
        {
            this.countriesRepository = countriesRepository;
        }

        public IEnumerable<KeyValuePair<int, string>> GetAllAsKvp()
            => this.countriesRepository
            .AllAsNoTracking()
            .Select(x => new
            {
                x.Id,
                x.Name,
            })
            .OrderBy(x => x.Name)
            .Select(x => new KeyValuePair<int, string>(x.Id, x.Name));
    }
}
