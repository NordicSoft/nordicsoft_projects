namespace Nordicsoft_ee.Services.MailSender
{
    public interface IMail
    {
        string SenderAddress { get; set; }

        string ReceiverAddress { get; set; }


        string Subject { get; set; }

        string TextBody { get; set; }

        string HtmlBody { get; set; }


    }
}
