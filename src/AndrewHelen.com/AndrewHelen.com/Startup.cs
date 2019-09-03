using Amazon.SimpleEmail;
using AndrewHelen.com.Services.EmailSenders;
using AndrewHelen.com.Services.GoogleRecaptcha;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using SmartBreadcrumbs;

namespace AndrewHelen.com
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment HostingEnvironment { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            // Add our Config object so it can be injected
            services.Configure<Settings>(Configuration.GetSection("SiteSettings"));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddSessionStateTempDataProvider();
            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status301MovedPermanently;
            });
            // These are the classes by default (Bootstrap 4.1)
            services.UseBreadcrumbs(GetType().Assembly, options =>
            {
                options.TagName = "nav";
                options.TagClasses = "nav-breadcrumb container";
                options.OlClasses = "breadcrumb";
                options.LiClasses = "breadcrumb-item";
                options.ActiveLiClasses = "breadcrumb-item active";
            });
            services.Configure<ReCaptchaClass>(Configuration.GetSection("GoogleRecaptcha"));
            services.AddScoped<IGoogleRecaptcha, GoogleRecaptcha>();

            if (HostingEnvironment.IsProduction())
            {
                services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
                services.AddAWSService<IAmazonSimpleEmailService>();
                services.AddTransient<IEmailSender, AmazonSesEmailSender>();
            }
            else
            {
                services.AddTransient<IEmailSender, SmtpEmailSender>();// Add Applciation Services
            }

            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    EnvParam = "development"
                });

            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
                app.Use((context, next) =>
                {
                    //HTTP\2 push feeature
                    context.Response.Headers["Link"] = "</dist/vendor_styles.css>; as=style; rel=preload, " +
                                                       "</dist/custom_styles.css>; as=style; rel=preload, " +
                                                       "</dist/fonts/montserrat-medium-subset.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/ptserif-italic-subset.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/montserrat-medium.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/montserrat-semibold.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/ptserif-italic.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/jquery_src.js>; as=script; rel=preload, " +
                                                       "</dist/bootstrap_src.js>; as=script; rel=preload, " +
                                                       "</dist/plugins_src.js>; as=script; rel=preload, " +
                                                       "</dist/main.js>; as=script; rel=preload";
                    return next.Invoke();
                });

            }

            app.UseHttpsRedirection();

            app.Use((context, next) =>
            {
                context.Response.Headers.Add("Service-Worker-Allowed", "/");
                return next.Invoke();
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    const int durationInSeconds = 60 * 60 * 24 * 365;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + durationInSeconds;
                }
            });
            app.UseSession();

            app.UseStatusCodePagesWithReExecute("/error/{0}");
            app.UseMvc();
        }
    }
}
