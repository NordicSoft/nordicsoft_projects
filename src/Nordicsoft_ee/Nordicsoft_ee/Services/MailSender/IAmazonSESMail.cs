namespace Nordicsoft_ee.Web.Services.MailSender
{
    public interface IAmazonSESMail : IMail
    {
        string ConfigSet { get; set; }
    }
}
