#pragma checksum "C:\Users\Diana\Documents\nordicsoftprojects\AndrewHelen.com\TemplateCoreWeb\Views\Shared\Error404.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d0a24889d208e2c4d989fc6222dd0a315862ef87"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared_Error404), @"mvc.1.0.view", @"/Views/Shared/Error404.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Shared/Error404.cshtml", typeof(AspNetCore.Views_Shared_Error404))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d0a24889d208e2c4d989fc6222dd0a315862ef87", @"/Views/Shared/Error404.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7d3d09e51aec1962c4c4c3d875263a07c2159c6d", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared_Error404 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 1 "C:\Users\Diana\Documents\nordicsoftprojects\AndrewHelen.com\TemplateCoreWeb\Views\Shared\Error404.cshtml"
  
    Layout = "~/Views/Shared/_Empty.cshtml";

#line default
#line hidden
            BeginContext(147, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            BeginContext(585, 621, true);
            WriteLiteral(@"<section id=""hero-bg-static"" class=""bg-img-cover hero bg-overlay-black-5 h-100 p-0 w-100 error-section"">
    <div class=""container"">
        <div class=""row align-items-center justify-content-center no-gutters"">
            <div class=""col-lg-12 text-center"">
                <div class=""hero-text"">
                    <p class=""font-alt2 text-white title-extra-large-2 title-md-extra-large-5 title-xl-big"">Oops!</p>
                    <p class=""font-alt letter-spacing-2 mt-3 text-medium text-uppercase text-white"">404 page not found</p>
                    <a class=""btn btn-small btn-lg-medium btn-base-color""");
            EndContext();
            BeginWriteAttribute("href", " href=\"", 1206, "\"", 1249, 1);
#line 23 "C:\Users\Diana\Documents\nordicsoftprojects\AndrewHelen.com\TemplateCoreWeb\Views\Shared\Error404.cshtml"
WriteAttributeValue("", 1213, Url.RouteUrl("HomeIndex").ToLower(), 1213, 36, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(1250, 109, true);
            WriteLiteral(" title=\"Home\">GO HOME</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
