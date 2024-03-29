﻿using Amazon.SimpleEmail;
using RichardGrace.com.Services.EmailSenders;
using RichardGrace.com.Services.GoogleRecaptcha;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using RichardGrace.com.EmailSenders;
using RichardGrace.com.Services.MailSender;
using Microsoft.Extensions.Hosting;

namespace RichardGrace.com
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)

        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment HostingEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            // Add our Config object so it can be injected
            services.Configure<Settings>(Configuration.GetSection("SiteSettings"));

            services.AddControllersWithViews().AddNewtonsoftJson(); ;
            services.AddRazorPages().AddNewtonsoftJson(); ;

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status301MovedPermanently;
            });
            services.Configure<ReCaptchaClass>(Configuration.GetSection("GoogleRecaptcha"));
            services.AddScoped<IGoogleRecaptcha, GoogleRecaptcha>();
            if (HostingEnvironment.IsProduction())
            {
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
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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

                // Add header:
                app.Use((context, next) =>
                {
                    //HTTP\2 push feeature
                    context.Response.Headers["Link"] = "</dist/custom_styles.css>; as=style; rel=preload, " +
                                                       "</dist/fonts/open-sans-subset.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/dancing-script-subset.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/react_js.js>; as=script; rel=preload, " +
                                                       "</dist/main.js>; as=script; rel=preload, " +
                                                       "</dist/fonts-load.js>; as=script; rel=preload," +
                                                       "</dist/fonts/open-sans-regular.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/open-sans-bold.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/dancing-script-regular.woff2>; as=font; crossorigin=anonymus; rel=preload, " +
                                                       "</dist/fonts/dancing-script-bold.woff2>; as=font; crossorigin=anonymus; rel=preload";
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
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
