using System.Text;
using Microsoft.AspNetCore.Mvc.Formatters;

public class TextPlainInputFormatter : TextInputFormatter
{
  public TextPlainInputFormatter()
  {
    SupportedMediaTypes.Add("text/html");
    SupportedMediaTypes.Add("text/plain");
    SupportedMediaTypes.Add("text/*");
    SupportedMediaTypes.Add("*");

    SupportedEncodings.Add(Encoding.Default);
    SupportedEncodings.Add(Encoding.UTF8);
    SupportedEncodings.Add(Encoding.ASCII);
    SupportedEncodings.Add(Encoding.Latin1);
    SupportedEncodings.Add(Encoding.Unicode);
    SupportedEncodings.Add(Encoding.BigEndianUnicode);
    SupportedEncodings.Add(Encoding.UTF32);
  }

  public override async Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context, Encoding encoding)
  {
    var request = context.HttpContext.Request;
    using (var reader = new StreamReader(request.Body, encoding))
    {
      var content = await reader.ReadToEndAsync();
      return await InputFormatterResult.SuccessAsync(content);
    }
  }

  public override bool CanRead(InputFormatterContext context)
  {
    return true;
  }
}