namespace YouShare.Data.Models
{
    using YouShare.Data.Common.Models;

    public class Country : BaseModel<int>
    {
        public string Name { get; set; }
    }
}
