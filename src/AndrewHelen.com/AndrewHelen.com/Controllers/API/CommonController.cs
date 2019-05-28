using System.Threading.Tasks;
using AndrewHelen.com.Services.GoogleRecaptcha;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace AndrewHelen.com.Controllers.API
{
    [Route("api/")]
    [ApiController]
    public class CommonController : Controller
    {
        [HttpPost]
        [Route("send-feedback")]
        public async Task<JObject> SendFeedback([FromServices] IGoogleRecaptcha googleRecaptcha, [FromServices] IEmailSender mailSender, [FromServices] IHostingEnvironment env)
        {

            string name = Request.Form["name"];
            string email = Request.Form["email"];
            string additionalInformation = Request.Form["additionalInformation"];
            string events = Request.Form["events"];
            string guests = Request.Form["guests"];
            string encodedResponse = Request.Form["g-recaptcha-response-token"];
            string action = Request.Form["g-recaptcha-action"];

            string subject = $"{Settings.SiteNameDomain}: Feedback from customer";
            var feedbackMessage =
                $"Events: {events} \n Guests: {guests} \n Additional information: {additionalInformation}";

            bool isCaptchaValid = await googleRecaptcha.IsCaptchaValid(encodedResponse, action);

            if (!isCaptchaValid && env.IsProduction())
            {
                return JObject.FromObject(new { success = false });
            }

            var textHtml = $"<p>{Settings.SiteNameDomain}: Feedback rom customer with name: <strong>{name}</strong></p><br>" +
                           $"<p>and e-mail: <strong>{email}</strong>: </p><br>" +
                           $"<p>{feedbackMessage}</p>";

            try
            {
                await mailSender.SendEmailAsync(Settings.SupportEmail, subject, textHtml);
                return JObject.FromObject(new { success = true });

            }
            catch
            {
                return JObject.FromObject(new { success = false });
            }
        }
    }
}