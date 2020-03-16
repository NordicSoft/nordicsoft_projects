using System.Threading.Tasks;

<<<<<<< HEAD:src/Nordicsoft_ee/Nordicsoft_ee/Services/GoogleRecaptcha/IGoogleRecaptcha.cs
namespace Nordicsoft_ee.Services.GoogleRecaptcha
=======
namespace Dalystudio.biz.Services.GoogleRecaptcha
>>>>>>> master-monorepo:src/Dalystudio.biz/Dalystudio.biz/Services/GoogleRecaptcha/IGoogleRecaptcha.cs
{
    public interface IGoogleRecaptcha
    {
        Task<bool> IsCaptchaValid(string encodedResponse, string action);
    }
}
