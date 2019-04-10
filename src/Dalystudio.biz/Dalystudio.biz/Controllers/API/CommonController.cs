﻿using System.Threading.Tasks;
using Dalystudio.biz.Services.GoogleRecaptcha;
using Dalystudio.biz.Services.MailSender;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Dalystudio.biz.Controllers.API
{
    [Route("api/")]
    [ApiController]
    public class CommonController : Controller
    {
        [HttpPost]
        [Route("send-feedback")]
        public async Task<JObject> SendFeedback([FromServices] IGoogleRecaptcha googleRecaptcha, [FromServices] IMailSender mailSender)
        {

            string name = Request.Form["cname"];
            string email = Request.Form["cemail"];
            string feedbackMessage = Request.Form["cmessage"];
            string encodedResponse = Request.Form["g-recaptcha-response-token"];
            string action = Request.Form["g-recaptcha-action"];

            string subject = $"{Settings.SiteNameDomain}: Feedback from customer";

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

            var textBody = $"{Settings.SiteNameDomain}: Feedback rom customer with name: {name} and e-mail: {email}: " +
                           $"{feedbackMessage}";

            var textHtml = $"<p>{Settings.SiteNameDomain}: Feedback rom customer with name: <strong>{name}</strong></p>" +
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