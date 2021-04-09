using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouShare.Web.ViewModels;

namespace YouShare.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ErrorsController : ControllerBase
    {
        private readonly ILogger<ErrorsController> logger;

        public ErrorsController(ILogger<ErrorsController> logger)
        {
            this.logger = logger;
        }

        [HttpPost]
        public IActionResult LogError(ErrorInputModel input)
        {
            this.logger.LogError(input.ErrorText);
            return this.Ok();
        }
    }
}
