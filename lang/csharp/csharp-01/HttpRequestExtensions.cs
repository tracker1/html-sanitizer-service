// FROM: https://weblog.west-wind.com/posts/2017/sep/14/accepting-raw-request-body-content-in-aspnet-core-api-controllers

using System.Text;

public static class HttpRequestExtensions
{

  /// <summary>
  /// Retrieve the raw body as a string from the Request.Body stream
  /// </summary>
  /// <param name="request">Request instance to apply to</param>
  /// <param name="encoding">Optional - Encoding, defaults to UTF8</param>
  /// <returns></returns>
  public static async Task<string> GetRawBodyStringAsync(this HttpRequest request, Encoding? encoding = null)
  {
    if (encoding == null)
      encoding = Encoding.UTF8;

    using (StreamReader reader = new StreamReader(request.Body, encoding))
      return await reader.ReadToEndAsync();
  }

  /// <summary>
  /// Retrieves the raw body as a byte array from the Request.Body stream
  /// </summary>
  /// <param name="request"></param>
  /// <returns></returns>
  public static async Task<byte[]> GetRawBodyBytesAsync(this HttpRequest request)
  {
    using (var ms = new MemoryStream(10240))
    {
      await request.Body.CopyToAsync(ms);
      return ms.ToArray();
    }
  }
}