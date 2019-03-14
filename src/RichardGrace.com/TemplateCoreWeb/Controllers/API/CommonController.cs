using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WeddingInvitation.Services.GoogleRecaptcha;
using WeddingInvitation.Services.MailSender;

namespace WeddingInvitation.Controllers.API
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
            string feedbackMessage = Request.Form["feedbackMessage"];
            string encodedResponse = Request.Form["g-recaptcha-response-token"];
            string action = Request.Form["g-recaptcha-action"];

            bool isCaptchaValid = await googleRecaptcha.IsCaptchaValid(encodedResponse, action);

            if (!isCaptchaValid)
            {
                return JObject.FromObject(new {success = false});
            }

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