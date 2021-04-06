using YouShare.Services.Mapping;

namespace YouShare.Web.ViewModels
{
    public class CurrentProfileReturnModel : IMapFrom<Data.Models.Profile>
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
