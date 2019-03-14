using System.Threading.Tasks;

namespace Nordicsoft_ee.Web.Services.GoogleRecaptcha
{
    public interface IGoogleRecaptcha
    {
        Task<bool> IsCaptchaValid(string encodedResponse, string action);
    }
}
