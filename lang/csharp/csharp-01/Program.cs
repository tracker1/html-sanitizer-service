using Ganss.XSS;

var port = Environment.GetEnvironmentVariable("APP_PORT") ?? "5000";

static StatusResult GetStatus()
{
  return new StatusResult { status = 200, code = "ONLINE", msg = "Online" };
}

static async Task<SanitizationResult> SanitizeInput(HttpRequest request, IHtmlSanitizer sanitizer)
{
  // Registering InputFormatter doesn't seem to work, using extension method instead
  var input = await request.GetRawBodyStringAsync();
  return new SanitizationResult
  {
    status = 200,
    result = sanitizer.Sanitize(input)
  };
}


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IHtmlSanitizer>(_ => new HtmlSanitizer());
var app = builder.Build();
app.MapGet("/", GetStatus);
app.MapPost("/", SanitizeInput);
app.Run($"http://0.0.0.0:{port}");
