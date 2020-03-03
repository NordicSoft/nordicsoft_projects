using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace RichardGrace.com.Controllers
{
    [Route("/", Name = "CultureLessHome")]
    public class HomeController : Controller
    {
        private ILogger<HomeController> _logger;
        private IRazorViewEngine _viewEngine;
        private Settings _settings;

        public HomeController(ILogger<HomeController> logger, IRazorViewEngine viewEngine, IOptions<Settings> settings)
        {
            _logger = logger;
            _viewEngine = viewEngine;
            _settings = settings.Value;
        }

        [Route("", Name = "HomeIndex")]
        public IActionResult Index(string culture)
        {
            return View();

        }

        [Route("contact", Name = "Contact")]
        public IActionResult Contact(string culture, string contactName, string contactEmail, string category, string typeOfService)
        {
            //}
            ViewBag.Name = TempData["contactName"] ?? "";
            ViewBag.Email = TempData["contactEmail"] ?? "";
            ViewBag.Category = TempData["category"] ?? "";
            ViewBag.TypeOfService = TempData["typeOfService"] ?? "";


            return View();
        }

        [Route("error/404")]
        public IActionResult Error404()
        {
            return View();
        }

        [Route("error/{code:int}")]
        public IActionResult Error(int code)
        {
            // handle different codes or just return the default error view
            return View();
        }


        [HttpPost]
        [Route("get-started", Name = "GetStartedForm")]
        public IActionResult GetStartedForm(string contactName, string contactEmail, string category, string typeOfService)
        {
            TempData["contactName"] = contactName;
            TempData["contactEmail"] = contactEmail;
            TempData["category"] = category;
            TempData["typeOfService"] = typeOfService;

            return RedirectToAction("Contact", "Home", null, "contact-section");
        }
    }
}
