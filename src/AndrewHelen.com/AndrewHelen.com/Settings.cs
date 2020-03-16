﻿using AndrewHelen.com.Services.GoogleRecaptcha;

namespace AndrewHelen.com
{
    public class Settings
    {
        public static string SupportEmail { get; set; }
        public static string FbAppId { get; set; }
        public static string SiteName { get; set; }
        public static string SiteNameDomain { get; set; }
        public static string ContentRootPath { get; set; }
        public static string WebRootPath { get; set; }
        public static EmailSenderSettings EmailSender { get; set; }

    }

    public class EmailSenderSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

}
