namespace NordicSoftEvents.Services.MailSender
{
    public interface IAmazonSESMail : IMail
    {
        string ConfigSet { get; set; }
    }
}
