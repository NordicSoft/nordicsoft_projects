using System.Threading.Tasks;

namespace Nordicsoft_ee.Services.GoogleRecaptcha
{
    public interface IGoogleRecaptcha
    {
        Task<bool> IsCaptchaValid(string encodedResponse, string action);
    }
}
