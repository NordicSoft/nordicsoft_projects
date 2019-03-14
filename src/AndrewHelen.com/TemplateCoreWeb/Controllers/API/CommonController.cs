using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Weeding.Services.GoogleRecaptcha;
using Weeding.Services.MailSender;

namespace Weeding.Controllers.API
{
    [Route("api/")]
    [ApiController]
    public class CommonController : Controller
    {
        [HttpPost]
        [Route("send-feedback")]
        public async Task<JObject> SendFeedback([FromServices] IGoogleRecaptcha googleRecaptcha, [FromServices] IMailSender mailSender, string subject = "Feedback from customer")
        {

            string name = Request.Form["name"];
            string email = Request.Form["email"];
            string additionalInformation = Request.Form["additionalInformation"];
            string events = Request.Form["events"];
            string guests = Request.Form["guests"];

            var feedbackMessage =
                $"Events: {events} \n Guests: {guests} \n Additional information: {additionalInformation}";

            var emailModel = new
            {
                Name = name,
                Email = email,
                Subject = subject,
                FeedbackMessage = feedbackMessage 

            };

            var textBody = $"Feedback rom customer with name: {name} and e-mail: {email}: " +
                           $"{feedbackMessage}";

            var textHtml = $"<p>Feedback rom customer with name: <strong>{name}</strong></p>" +
                           $"<p>and e-mail: <strong>{email}</strong>: </p>" +
                           $"<p>{feedbackMessage}</p>";

            // send email to administrator
            IMail mail = new AmazonSESMail
            {
                SenderAddress = Settings.SupportEmail,
                ReceiverAddress = Settings.SupportEmail,
                Subject = subject,
                TextBody = textBody,
                HtmlBody = textHtml
            };
            var success = await mailSender.SendEmailAsync(mail);

            return JObject.FromObject(new {success = success });
        }

    }
}