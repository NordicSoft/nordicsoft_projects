using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SmartBreadcrumbs;

namespace Nordicsoft_ee.Web.Controllers
{
    [Route("/", Name = "CultureLessHome")]
    public class HomeController : Controller
    {
        private ILogger<HomeController> _logger;
        private IRazorViewEngine _viewEngine;
        private BreadcrumbsManager _breadcrumbsManager;
        private Settings _settings;

        public HomeController(ILogger<HomeController> logger, IRazorViewEngine viewEngine, BreadcrumbsManager breadcrumbsManager, IOptions<Settings> settings)
        {
            _logger = logger;
            _viewEngine = viewEngine;
            _breadcrumbsManager = breadcrumbsManager;
            _settings = settings.Value;
        }

        [DefaultBreadcrumb("Home")]
        [Route("", Name = "HomeIndex")]
        public IActionResult Index(string culture)
        {
            return View();

        }

        [Route("error/404")]
        public IActionResult Error404()
        {
            return View();
        }
    }
}
