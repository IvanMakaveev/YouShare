using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace YouShare.Services.Data
{
    public interface IImagesService
    {
        Task<string> CreateAsync(IFormFile image, string path);
    }
}
