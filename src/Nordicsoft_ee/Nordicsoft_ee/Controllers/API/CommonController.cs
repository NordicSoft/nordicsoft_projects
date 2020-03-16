using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Nordicsoft_ee.Services.GoogleRecaptcha;
using Nordicsoft_ee.Services.EmailSenders;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Nordicsoft_ee.Controllers.API
{
    [Route("api/")]
    [ApiController]
    public class CommonController : Controller
    {
        [HttpPost]
        [Route("send-feedback")]
        public async Task<JObject> SendFeedback([FromServices] IGoogleRecaptcha googleRecaptcha,
            [FromServices] IEmailSender mailSender, [FromServices] IHostingEnvironment env)

        {

            string name = Request.Form["name"];
            string email = Request.Form["email"];
            string feedbackMessage = Request.Form["feedbackMessage"];
            string encodedResponse = Request.Form["g-recaptcha-response-token"];
            string action = Request.Form["g-recaptcha-action"];

            string subject = $"{Settings.SiteName}: Feedback from customer";

            bool isCaptchaValid = await googleRecaptcha.IsCaptchaValid(encodedResponse, action);

            if (!isCaptchaValid && env.IsProduction())

            {
                return JObject.FromObject(new {success = false});
            }


            var textHtml =
                $"<p>{Settings.SiteNameDomain}: Feedback from customer with name: <strong>{name}</strong></p><br>" +
                $"<p>and e-mail: <strong>{email}</strong>: </p><br>" +
                $"<p>{feedbackMessage}</p>";

            try
            {

                await mailSender.SendEmailAsync(Settings.SupportEmail, subject, textHtml);
                return JObject.FromObject(new {success = true});


            }
            catch
            {
                return JObject.FromObject(new {success = false});
            }


        }
    }
}