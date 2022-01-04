// FROM: https://weblog.west-wind.com/posts/2017/sep/14/accepting-raw-request-body-content-in-aspnet-core-api-controllers
using Microsoft.AspNetCore.Mvc.Formatters;

/// <summary>
/// Formatter that allows content of type text/plain and application/octet stream
/// or no content type to be parsed to raw data. Allows for a single input parameter
/// in the form of:
/// 
/// public string RawString([FromBody] string data)
/// public byte[] RawData([FromBody] byte[] data)
/// </summary>
public class RawRequestBodyFormatter : InputFormatter
{
  public RawRequestBodyFormatter()
  {
    SupportedMediaTypes.Add("text/html");
    SupportedMediaTypes.Add("text/plain");
    SupportedMediaTypes.Add("application/octet-stream");

    // SupportedEncodings.Add(Encoding.Default);
    // SupportedEncodings.Add(Encoding.UTF8);
    // SupportedEncodings.Add(Encoding.ASCII);
    // SupportedEncodings.Add(Encoding.Latin1);
    // SupportedEncodings.Add(Encoding.Unicode);
    // SupportedEncodings.Add(Encoding.BigEndianUnicode);
    // SupportedEncodings.Add(Encoding.UTF32);
  }


  /// <summary>
  /// Allow text/plain, application/octet-stream and no content type to
  /// be processed
  /// </summary>
  /// <param name="context"></param>
  /// <returns></returns>
  public override Boolean CanRead(InputFormatterContext context)
  {
    Console.WriteLine("CanRead");
    if (context == null) throw new ArgumentNullException(nameof(context));

    var contentType = context.HttpContext.Request.ContentType;
    if (string.IsNullOrEmpty(contentType)
        || contentType == "text/plain"
        || contentType == "text/html"
        || contentType == "application/octet-stream"
    )
    {
      return true;
    }

    return false;
  }

  /// <summary>
  /// Handle text/plain, text/html or no content type for string results
  /// Handle application/octet-stream for byte[] results
  /// </summary>
  /// <param name="context"></param>
  /// <returns></returns>
  public override async Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context)
  {
    Console.WriteLine("ReadRequestBodyAsync");
    var request = context.HttpContext.Request;
    var contentType = context.HttpContext.Request.ContentType;


    if (string.IsNullOrEmpty(contentType) || contentType == "text/plain" || contentType == "text/html")
    {
      using (var reader = new StreamReader(request.Body))
      {
        var content = await reader.ReadToEndAsync();
        return await InputFormatterResult.SuccessAsync(content);
      }
    }
    if (contentType == "application/octet-stream")
    {
      // 10k limit
      using (var ms = new MemoryStream(10240))
      {
        await request.Body.CopyToAsync(ms);
        var content = ms.ToArray();
        return await InputFormatterResult.SuccessAsync(content);
      }
    }

    return await InputFormatterResult.FailureAsync();
  }
}
