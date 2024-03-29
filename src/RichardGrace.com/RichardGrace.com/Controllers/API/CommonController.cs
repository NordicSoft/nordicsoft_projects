﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;
using RichardGrace.com.Services.GoogleRecaptcha;
using RichardGrace.com.Services.MailSender;

namespace RichardGrace.com.Controllers.API
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
            string comments = Request.Form["comments"];
            string encodedResponse = Request.Form["g-recaptcha-response-token"];
            string action = Request.Form["g-recaptcha-action"];

            string subject = $"{Settings.SiteNameDomain}: Feedback from customer";
            var feedbackMessage = $"Comments: {comments}";

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
            catch(System.Exception e)
            {
                return JObject.FromObject(new { success = false, message = e.Message });
            }
        }
    }
}