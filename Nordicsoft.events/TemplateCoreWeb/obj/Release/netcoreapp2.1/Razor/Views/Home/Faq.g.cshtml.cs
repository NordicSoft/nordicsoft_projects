#pragma checksum "C:\Users\Rodion\Documents\Visual Studio 2017\Projects\TemplateCoreWeb\TemplateCoreWeb\Views\Home\Faq.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b310f91e5b8fc88266c10baa0ee8435553ca9a9e"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Faq), @"mvc.1.0.view", @"/Views/Home/Faq.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/Faq.cshtml", typeof(AspNetCore.Views_Home_Faq))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b310f91e5b8fc88266c10baa0ee8435553ca9a9e", @"/Views/Home/Faq.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7d3d09e51aec1962c4c4c3d875263a07c2159c6d", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Faq : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "C:\Users\Rodion\Documents\Visual Studio 2017\Projects\TemplateCoreWeb\TemplateCoreWeb\Views\Home\Faq.cshtml"
  
    ViewData["Title"] = "Faq";

#line default
#line hidden
            DefineSection("metatags", async() => {
                BeginContext(59, 82, true);
                WriteLiteral("\r\n    <meta property=\"og:type\" content=\"website\" />\r\n    <meta property=\"og:title\"");
                EndContext();
                BeginWriteAttribute("content", " content=\"", 141, "\"", 186, 3);
#line 7 "C:\Users\Rodion\Documents\Visual Studio 2017\Projects\TemplateCoreWeb\TemplateCoreWeb\Views\Home\Faq.cshtml"
WriteAttributeValue("", 151, ViewData["Title"], 151, 18, false);

#line default
#line hidden
                WriteAttributeValue(" ", 169, "|", 170, 2, true);
                WriteAttributeValue(" ", 171, "NordicSoft.net", 172, 15, true);
                EndWriteAttribute();
                BeginContext(187, 217, true);
                WriteLiteral(" />\r\n    <meta property=\"og:description\" content=\"We know answers to all your queries. Find the info you require or get in touch with us if you haven\'t found what you were looking for.\" />\r\n    <meta property=\"og:url\"");
                EndContext();
                BeginWriteAttribute("content", " content=\"", 404, "\"", 490, 1);
#line 9 "C:\Users\Rodion\Documents\Visual Studio 2017\Projects\TemplateCoreWeb\TemplateCoreWeb\Views\Home\Faq.cshtml"
WriteAttributeValue("", 414, $"{Context.Request.Scheme}://{Context.Request.Host}{Url.RouteUrl("Faq")}", 414, 76, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(491, 34, true);
                WriteLiteral(" />\r\n    <meta property=\"og:image\"");
                EndContext();
                BeginWriteAttribute("content", " content=\"", 525, "\"", 614, 1);
#line 10 "C:\Users\Rodion\Documents\Visual Studio 2017\Projects\TemplateCoreWeb\TemplateCoreWeb\Views\Home\Faq.cshtml"
WriteAttributeValue("", 535, $"{Context.Request.Scheme}://{Context.Request.Host}/img/noridc_og_image.jpg", 535, 79, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(615, 297, true);
                WriteLiteral(@" />
    <meta property=""og:image:width"" content=""1269"" />
    <meta property=""og:image:height"" content=""642"" />

    <meta name=""description"" content=""We know answers to all your queries. Find the info you require or get in touch with us if you haven't found what you were looking for."" />

");
                EndContext();
            }
            );
            BeginContext(915, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            DefineSection("links", async() => {
                BeginContext(938, 27, true);
                WriteLiteral("\r\n    <link rel=\"canonical\"");
                EndContext();
                BeginWriteAttribute("href", " href=\"", 965, "\"", 1048, 1);
#line 20 "C:\Users\Rodion\Documents\Visual Studio 2017\Projects\TemplateCoreWeb\TemplateCoreWeb\Views\Home\Faq.cshtml"
WriteAttributeValue("", 972, $"{Context.Request.Scheme}://{Context.Request.Host}{Url.RouteUrl("Faq")}", 972, 76, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(1049, 5, true);
                WriteLiteral(" />\r\n");
                EndContext();
            }
            );
            BeginContext(1057, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            DefineSection("criticalCSS", async() => {
                BeginContext(1086, 13, true);
                WriteLiteral("\r\n    <style>");
                EndContext();
                BeginContext(1100, 855, true);
                WriteLiteral(@"@font-face{font-family:FontAwesome;font-style:normal;font-weight:400;src:url(/dist/fonts/fontawesome-webfont.eot);src:url(/dist/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0) format(""embedded-opentype""),url(/dist/fonts/fontawesome-webfont.woff2) format(""woff2""),url(/dist/fonts/fontawesome-webfont.woff) format(""woff""),url(/dist/fonts/fontawesome-webfont.ttf) format(""truetype""),url(/dist/fonts/fontawesome-webfont.svg#fontawesomeregular) format(""svg"")}.fa{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto}.fa-angle-down:before{content:""\F107""}html{-ms-overflow-style:scrollbar;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;box-sizing:border-box;font-family:sans-serif;line-height:1.15}*,:after,:before{box-sizing:inherit}");
                EndContext();
                BeginContext(1956, 1129, true);
                WriteLiteral(@"@-ms-viewport{width:device-width}header,main,nav,section{display:block}body{background-color:#fff;color:#212529;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:1rem;font-weight:400;line-height:1.5;margin:0}h1,h2{margin-bottom:.5rem;margin-top:0}p{margin-bottom:1rem;margin-top:0}ol,ul{margin-bottom:1rem}ol,ul{margin-top:0}a{-webkit-text-decoration-skip:objects;background-color:transparent;color:#007bff;text-decoration:none}img{border-style:none;vertical-align:middle}a,button,input{touch-action:manipulation}button,input{font-family:inherit;font-size:inherit;line-height:inherit;margin:0}button,input{overflow:visible}button{text-transform:none}button{-webkit-appearance:button}button::-moz-focus-inner{border-style:none;padding:0}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.h1,h1,h2{color:inherit;font-family:inherit;font-weight:500;line-height:1.1;margin-bottom:.5rem}.h1,h1{font-size:2.5rem}h2{font-size:2rem}.lead{font-size:1.25rem;font-");
                WriteLiteral("weight:300}.container{margin-left:auto;margin-right:auto;padding-left:15px;padding-right:15px;width:100%}");
                EndContext();
                BeginContext(3086, 53, true);
                WriteLiteral("@media (min-width:576px){.container{max-width:540px}}");
                EndContext();
                BeginContext(3140, 53, true);
                WriteLiteral("@media (min-width:768px){.container{max-width:720px}}");
                EndContext();
                BeginContext(3194, 53, true);
                WriteLiteral("@media (min-width:992px){.container{max-width:960px}}");
                EndContext();
                BeginContext(3248, 261, true);
                WriteLiteral(@"@media (min-width:1200px){.container{max-width:1140px}}.row{display:flex;flex-wrap:wrap;margin-left:-15px;margin-right:-15px}.col-12,.col-lg-6{min-height:1px;padding-left:15px;padding-right:15px;position:relative;width:100%}.col-12{flex:0 0 100%;max-width:100%}");
                EndContext();
                BeginContext(3510, 785, true);
                WriteLiteral(@"@media (min-width:992px){.col-lg-6{flex:0 0 50%;max-width:50%}}.collapse{display:none}.collapse.show{display:block}.nav-link{display:block;padding:.5rem 1rem}.navbar{padding:.5rem 1rem;position:relative}.navbar{align-items:center;display:flex;flex-wrap:wrap;justify-content:space-between}.navbar-brand{display:inline-block;font-size:1.25rem;line-height:inherit;margin-right:1rem;padding-bottom:.3125rem;padding-top:.3125rem;white-space:nowrap}.navbar-nav{display:flex;flex-direction:column;list-style:none;margin-bottom:0;padding-left:0}.navbar-nav .nav-link{padding-left:0;padding-right:0}.navbar-collapse{align-items:center;flex-basis:100%}.navbar-toggler{background:transparent;border:1px solid transparent;border-radius:.25rem;font-size:1.25rem;line-height:1;padding:.25rem .75rem}");
                EndContext();
                BeginContext(4296, 828, true);
                WriteLiteral(@"@media (min-width:992px){.navbar-expand-lg{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-lg,.navbar-expand-lg .navbar-nav{flex-direction:row}.navbar-expand-lg .navbar-nav .nav-link{padding-left:.5rem;padding-right:.5rem}.navbar-expand-lg .navbar-collapse{display:flex!important}.navbar-expand-lg .navbar-toggler{display:none}}.breadcrumb{background-color:#e9ecef;border-radius:.25rem;list-style:none;margin-bottom:1rem;padding:.75rem 1rem}.breadcrumb:after{clear:both;content:"""";display:block}.breadcrumb-item{float:left}.breadcrumb-item+.breadcrumb-item:before{color:#868e96;content:""/"";display:inline-block;padding-left:.5rem;padding-right:.5rem}.breadcrumb-item.active{color:#868e96}.bg-primary{background-color:#007bff!important}.bg-white{background-color:#fff!important}.rounded{border-radius:.25rem!important}");
                EndContext();
                BeginContext(5125, 417, true);
                WriteLiteral(@"@supports (position:sticky){.sticky-top{position:sticky;top:0;z-index:1020}}.mr-3{margin-right:1rem!important}.mt-4{margin-top:1.5rem!important}.my-4{margin-bottom:1.5rem!important;margin-top:1.5rem!important}.p-0{padding:0!important}.p-4{padding:1.5rem!important}.m-auto{margin:auto!important}.ml-auto,.mx-auto{margin-left:auto!important}.mx-auto{margin-right:auto!important}.text-center{text-align:center!important}");
                EndContext();
                BeginContext(5543, 259, true);
                WriteLiteral(@"@font-face{font-family:DosisSubset;font-style:normal;font-weight:600;src:url(/dist/fonts/dosissemibold-subset.woff2) format(""woff2""),url(/dist/fonts/dosissemibold-subset.zopfli.woff) format(""woff""),url(/dist/fonts/dosissemibold-subset.ttf) format(""truetype"")}");
                EndContext();
                BeginContext(5803, 247, true);
                WriteLiteral("@font-face{font-family:OpenSansSubset;font-style:normal;font-weight:400;src:url(/dist/fonts/opensans-subset.woff2) format(\"woff2\"),url(/dist/fonts/opensans-subset.zopfli.woff) format(\"woff\"),url(/dist/fonts/opensans-subset.ttf) format(\"truetype\")}");
                EndContext();
                BeginContext(6051, 201, true);
                WriteLiteral("@font-face{font-family:Dosis;font-style:normal;font-weight:400;src:url(/dist/fonts/dosis.woff2) format(\"woff2\"),url(/dist/fonts/dosis.woff) format(\"woff\"),url(/dist/fonts/dosis.ttf) format(\"truetype\")}");
                EndContext();
                BeginContext(6253, 219, true);
                WriteLiteral("@font-face{font-family:Dosis;font-style:normal;font-weight:500;src:url(/dist/fonts/dosismedium.woff2) format(\"woff2\"),url(/dist/fonts/dosismedium.woff) format(\"woff\"),url(/dist/fonts/dosismedium.ttf) format(\"truetype\")}");
                EndContext();
                BeginContext(6473, 225, true);
                WriteLiteral("@font-face{font-family:Dosis;font-style:normal;font-weight:600;src:url(/dist/fonts/dosissemibold.woff2) format(\"woff2\"),url(/dist/fonts/dosissemibold.woff) format(\"woff\"),url(/dist/fonts/dosissemibold.ttf) format(\"truetype\")}");
                EndContext();
                BeginContext(6699, 214, true);
                WriteLiteral("@font-face{font-family:Open Sans;font-style:normal;font-weight:400;src:url(/dist/fonts/opensans.woff2) format(\"woff2\"),url(/dist/fonts/opensans.woff) format(\"woff\"),url(/dist/fonts/opensans.ttf) format(\"truetype\")}");
                EndContext();
                BeginContext(6914, 238, true);
                WriteLiteral("@font-face{font-family:Open Sans;font-style:normal;font-weight:600;src:url(/dist/fonts/opensanssemibold.woff2) format(\"woff2\"),url(/dist/fonts/opensanssemibold.woff) format(\"woff\"),url(/dist/fonts/opensanssemibold.ttf) format(\"truetype\")}");
                EndContext();
                BeginContext(7153, 739, true);
                WriteLiteral(@"@font-face{font-family:Open Sans;font-style:normal;font-weight:700;src:url(/dist/fonts/opensansbold.woff2) format(""woff2""),url(/dist/fonts/opensansbold.woff) format(""woff""),url(/dist/fonts/opensansbold.ttf) format(""truetype"")}body{color:#5a6671;font-family:Arial;font-family:Arial,sans-serif;font-size:1rem;font-weight:400;line-height:1.875em;overflow-x:hidden}.fonts-loaded-1 body{font-family:OpenSansSubset}.fonts-loaded-2 body{font-family:Open Sans}img{max-width:100%}.h1,h1,h2{color:#273f5b;font-family:Arial,sans-serif;font-weight:600;line-height:1.37em}.fonts-loaded-1 .h1,.fonts-loaded-1 h1,.fonts-loaded-1 h2{font-family:DosisSubset}.fonts-loaded-2 .h1,.fonts-loaded-2 h1,.fonts-loaded-2 h2{font-family:Dosis}.h1,h1{font-size:40px}");
                EndContext();
                BeginContext(7893, 66, true);
                WriteLiteral("@media (max-width:767px){.h1,h1{font-size:30px}}h2{font-size:30px}");
                EndContext();
                BeginContext(7960, 290, true);
                WriteLiteral(@"@media (max-width:767px){h2{font-size:28px}}a{color:inherit;text-decoration:none}button,input{font-family:Arial,sans-serif}.fonts-loaded-1 input{font-family:OpenSansSubset}.fonts-loaded-2 input{font-family:Open Sans}section{padding-bottom:75px;padding-top:75px;position:relative;z-index:10}");
                EndContext();
                BeginContext(8251, 1703, true);
                WriteLiteral(@"@media (max-width:991px){section{padding-bottom:40px;padding-top:40px}}input{border:1px solid #e9eff5;border-radius:4px;padding:9px 30px;width:100%}input:-moz-placeholder,input::-moz-placeholder{color:#8ea4b8;font-size:1rem;opacity:1}input:-ms-input-placeholder{color:#8ea4b8;font-size:1rem;opacity:1}input::-webkit-input-placeholder{color:#8ea4b8;font-size:1rem;opacity:1}i.fa{line-height:inherit}.nav-breadcrumb{background-color:transparent;padding-left:0;position:absolute;top:0}.nav-breadcrumb ol.breadcrumb{background-color:transparent;margin:0}.hamburger{background-color:transparent;border:0;color:inherit;display:inline-block;font:inherit;margin:0;overflow:visible;padding:10px;text-transform:none}.hamburger-box{display:inline-block;height:24px;position:relative;width:40px}.hamburger-inner{display:block;margin-top:-1px;top:50%}.hamburger-inner,.hamburger-inner:after,.hamburger-inner:before{background-color:#54667a;border-radius:4px;height:1px;position:absolute;width:30px}.hamburger-inner:after,.hamburger-inner");
                WriteLiteral(@":before{content:"""";display:block}.hamburger-inner:before{top:-9px}.hamburger-inner:after{bottom:-9px}.header{background-color:#fafcff;padding-bottom:20px;padding-top:20px}.navbar-brand{color:#0070f0;font-family:Arial,sans-serif;font-size:2.5rem;font-weight:600;position:relative}.navbar-nav>.nav-item{margin-left:15px}.navbar-nav>.nav-item>.nav-link{font-family:Arial,sans-serif;font-size:16px;font-weight:600;text-transform:uppercase}.fonts-loaded-1 .navbar-nav>.nav-item>.nav-link{font-family:DosisSubset}.fonts-loaded-2 .navbar-nav>.nav-item>.nav-link{font-family:Dosis}.navbar-toggler{color:#54667a;position:relative}.header-shadow{box-shadow:0 3px 20px 0 rgba(0,112,240,.1)}");
                EndContext();
                BeginContext(9955, 132, true);
                WriteLiteral("@media (max-width:991px){#navbarNav{background:#fff;max-height:100vh;overflow:auto;padding:20px}#navbarNav .nav-link{color:#54667a}}");
                EndContext();
                BeginContext(10088, 1029, true);
                WriteLiteral(@"@media (max-width:380px){.header .navbar-brand>img{width:200px}}.accordion__faq{border-bottom:1px solid #eaecef}.accordion__title{color:#273f59;display:block;font-family:Arial,sans-serif;font-size:20px;font-weight:600}.accordion__text{padding-bottom:30px;padding-left:30px;padding-right:30px}.fonts-loaded-1 .accordion__title{font-family:DosisSubset}.fonts-loaded-2 .accordion__title{font-family:Dosis}.box-shadow-v2{-webkit-box-shadow:0 0 50px 0 rgba(22,104,183,.15);box-shadow:0 0 50px 0 rgba(22,104,183,.15)}.u-flex-center{-ms-flex-align:center;-ms-flex-direction:column;-ms-flex-pack:center;-webkit-box-align:center;-webkit-box-direction:normal;-webkit-box-orient:vertical;-webkit-box-pack:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;flex-direction:column;justify-content:center}.bg-white{background:#fff!important}.bg-primary{background:#0070f0!important}.u-h-4{height:.25rem}.u-mb-40{margin-bottom:2.5rem!important}.u-py-100{padding-bottom:6.25rem!important;padding-top:6.25rem!impor");
                WriteLiteral("tant}");
                EndContext();
                BeginContext(11118, 113, true);
                WriteLiteral("@media (min-width:768px){.u-pt-md-60{padding-top:3.75rem!important}.u-pb-md-60{padding-bottom:3.75rem!important}}");
                EndContext();
                BeginContext(11232, 168, true);
                WriteLiteral("@media (min-width:992px){.u-pt-lg-120{padding-top:7.5rem!important}.u-pb-lg-100{padding-bottom:6.25rem!important}}.u-w-50{width:3.125rem!important}.lead{font-size:22px}");
                EndContext();
                BeginContext(11401, 137, true);
                WriteLiteral("@supports (position:sticky) or (position:-webkit-sticky){.sticky-top{position:-webkit-sticky;position:sticky;top:0;z-index:1000}}</style>");
                EndContext();
            }
            );
            BeginContext(11541, 985, true);
            WriteLiteral(@"
<section class=""u-py-100 u-pt-lg-120 u-pb-lg-100 u-pt-md-60 u-pb-md-60 u-flex-center"" style=""background:#ECF5FE url(/img/startup/hero-banner.png) no-repeat; background-size:cover; background-position: top center;"">

    <div class=""container"">
        <div class=""row"">
            <div class=""col-12 text-center"">
                <h1 class="""">
                    FAQ
                </h1>
                <div class=""u-h-4 u-w-50 bg-primary rounded mx-auto my-4""></div>
                <p class=""lead"">
                    Check the questions below to find what you might be looking for. In case you don't see the response you want or need more detailed information, please get in touch with us. All your inquiries will be answered within the shortest amount of time.
                </p>
            </div>
        </div> <!-- END row-->
    </div> <!-- END container-->
</section> <!-- END intro-hero-->

<section id=""faq"">
    <div class=""container"">
        ");
            EndContext();
            BeginContext(12527, 39, false);
#line 46 "C:\Users\Rodion\Documents\Visual Studio 2017\Projects\TemplateCoreWeb\TemplateCoreWeb\Views\Home\Faq.cshtml"
   Write(await Html.PartialAsync("_Breadcrumbs"));

#line default
#line hidden
            EndContext();
            BeginContext(12566, 12656, true);
            WriteLiteral(@"

        <div class=""row"">
            <div class=""col-lg-6 m-auto text-center"">
                <h2 class=""h1"">
                    Frequently Asked Questions
                </h2>
                <div class=""u-h-4 u-w-50 bg-primary rounded mt-4 u-mb-40 mx-auto""></div>
            </div>
        </div> <!--END row-->

        <div class=""row"">
            <div class=""col-12 mt-4"">
                <div id=""accordion"" role=""tablist"" class=""bg-white box-shadow-v2"">

                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc1"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            I don't know much about website creation process, how does it work?
                        </a>
                        <div id=""acc1"" class=""collapse show"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                It's t");
            WriteLiteral(@"oo complicated to be explained in a few sentences. Please find the detailed description in ‘workflow' section. And contact us right away if any questions occur.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->

                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc2"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            How long have you been doing it?
                        </a>
                        <div id=""acc2"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                NordicSoft Company was found in 2017, therefore, we have been doing fantastic websites for almost two years already.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
");
            WriteLiteral(@"
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc3"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            What is the average price of an ordinary website?
                        </a>
                        <div id=""acc3"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                The cost depends on a lot of factors, it's like you're buying a house or a car. We offer different packages and prices vary depending on features included. Check our ‘Pricing' sections for more concrete numbers and details. Or contact us and we will calculate the price for you, it's free!
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->

                    <div class=""accordion__faq"">
                        <a class=""accordion__t");
            WriteLiteral(@"itle p-4"" data-toggle=""collapse"" href=""#acc4"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            How should I pay for my website?
                        </a>
                        <div id=""acc4"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                You don't pay the whole amount immediately. First payment is a 50% deposit which is paid in the beginning of our journey. After your website design is approved, and before we move to the programming part, another 25% deposit is collected. The final payment is done after everything is already finished and your website is totally ready to be launched.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->

                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc5"">
    ");
            WriteLiteral(@"                        <i class=""fa fa-angle-down mr-3""></i>
                            Who are your customers?
                        </a>
                        <div id=""acc5"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                We have a lot of different people and companies as our customers. We can work either with one person only (portfolios, personal blogs, etc.), or small startup communities, or large corporations, it is not important for us as long as our client is satisfied and our job is appreciated! Over the years, we have done plenty of projects across various business industries (sales, food, health and beauty, travel, art, fashion, education, and more). <br />
                                Before we start working on any project, our team studies the specified industry thoroughly to make sure your website supports everything needed to be ahead of all the competitors.
                      ");
            WriteLiteral(@"      </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc6"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            How long should I wait for my website to be ready?
                        </a>
                        <div id=""acc6"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                The creation process time depends on the package selected and can vary from project to project. Our standard package websites take averagely 1 month to be completed. But it doesn't mean all our sites are completed within this time period. We are ready for urgent cases as well as for lasting projects.
                            </div>
                        </div>
                    </div>	 <!-- END acc");
            WriteLiteral(@"ordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc7"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            Who will work on my website?
                        </a>
                        <div id=""acc7"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                In ‘Team' section you can meet our team (with photos!). We are happy to meet you and we will be glad to work with you! All our customers communicate only and directly with our team members. Who that will be, depends on your requirements and stage of the project process.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""coll");
            WriteLiteral(@"apse"" href=""#acc8"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            What platform do you work with?
                        </a>
                        <div id=""acc8"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                Our developers work with  ASP.NET MVS, WordPress (PHP), Node.js and other platforms.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc10"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            Can you change and update my existing website done by another web development firm?
                        </a>
                        <div id=""acc10"" class=""collapse"" role=""tabpanel"" data-parent=""#acc");
            WriteLiteral(@"ordion"">
                            <div class=""accordion__text"">
                                It depends on the platform it was built on among a lot of other factors. Every single project we work on is unique so we will be ready to give you an answer on this question after checking your requirements. Our manager is always ready to discuss the details.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc11"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            Do you also write content for websites you develop?
                        </a>
                        <div id=""acc11"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                Yes, we provide content ");
            WriteLiteral(@"writing service as well. Some of the packages we offer include this service. Please check our ‘Pricing' section. We also offer this service as a standalone feature, you can order it separately.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc12"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            Can you find photos for websites?
                        </a>
                        <div id=""acc12"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                Yes. We can help you with stocking necessary photos from the sources like <a href=""https://www.shutterstock.com/"" rel=""noopener noreferrer nofollow"" target=""_blank"">shutterstock.com</a>, <a href=""http://www.cr");
            WriteLiteral(@"estock.com/"" rel=""noopener noreferrer nofollow"" target=""_blank"">crestock.com</a>, <a href=""https://www.istockphoto.com/"" rel=""noopener noreferrer nofollow"" target=""_blank"">istockphoto.com</a>. Also, we cooperate with freelance photographers who can provide custom photography if needed.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc13"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            Will I be the owner of my website?
                        </a>
                        <div id=""acc13"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                Of course! The website will be 100% yours. We offer lifetime support for all the projects we complete and most of o");
            WriteLiteral(@"ur customers decide to stay with us after all. But if you wish to take your website to another company to service it, we will undoubtedly help you to make sure the transition is done as efficiently as possible.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->
                    <div class=""accordion__faq"">
                        <a class=""accordion__title p-4"" data-toggle=""collapse"" href=""#acc14"">
                            <i class=""fa fa-angle-down mr-3""></i>
                            Will my personal information be safe?
                        </a>
                        <div id=""acc14"" class=""collapse"" role=""tabpanel"" data-parent=""#accordion"">
                            <div class=""accordion__text"">
                                Yes, definitely. We do not store any personal details about our customers. All provided information is never used anywhere without your notice and confirmation. All your info is completely");
            WriteLiteral(@" deleted from our system after our cooperation is over.
                            </div>
                        </div>
                    </div>	 <!-- END accordion__faq-->

                </div> <!-- END accordion-->
            </div> <!-- END col-12-->
        </div> <!-- END row-->

    </div> <!-- END container-->
</section> <!-- END section-->
");
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
