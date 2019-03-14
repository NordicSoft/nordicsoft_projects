using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Event.Services.GoogleRecaptcha;
using Event.Services.MailSender;

namespace Event.Controllers.API
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
            string phone = Request.Form["phone"];
            string seats = Request.Form["numberSeats"];
            string pass = Request.Form["selectPass"];

            var feedbackMessage =
                $"Seats: {seats} \n Pass: {pass}";

            var emailModel = new
            {
                Name = name,
                Email = email,
                Phone = phone,
                //Seats = seats,
                //Pass = pass,
                //Subject = subject,
                FeedbackMessage = feedbackMessage
            };

            var textBody = $"Feedback from customer with name: {name} and e-mail: {email}: " +
                           $"{feedbackMessage}";

            var textHtml = $"<p>Feedback from customer with name: <strong>{name}</strong></p>" +
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