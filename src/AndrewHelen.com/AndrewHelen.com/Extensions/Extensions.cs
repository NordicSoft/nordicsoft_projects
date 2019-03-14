using System;

namespace AndrewHelen.com.Extensions
{
    public static class Extensions
    {
        public static string UppercaseFirstLetter(this String str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return string.Empty;
            }
            var a = str.ToCharArray();
            a[0] = char.ToUpper(a[0]);
            return new string(a);
        }
        public static string Truncate(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return value.Length <= maxLength ? value : value.Substring(0, maxLength);
        }
    }
}
