namespace AndrewHelen.com.Services.MailSender
{
    public class AmazonSESMail : IAmazonSESMail
    {

        // Replace sender@example.com with your "From" address.
        // This address must be verified with Amazon SES.
        public string SenderAddress { get; set; }

        // Replace recipient@example.com with a "To" address. If your account
        // is still in the sandbox, this address must be verified.
        public string ReceiverAddress { get; set; }

        // The configuration set to use for this email. If you do not want to use a
        // configuration set, comment out the following property and the
        // ConfigurationSetName = configSet argument below. 
        public string ConfigSet { get; set; }

        // The subject line for the email.
        public string Subject { get; set; }

        // The email body for recipients with non-HTML email clients.
        public string TextBody { get; set; }

        // The HTML body of the email.
        public string HtmlBody { get; set; }
    }
}
