using Microsoft.AspNetCore.Mvc;

var port = Environment.GetEnvironmentVariable("APP_PORT") ?? "5000";

static StatusResult GetStatus()
{
  return new StatusResult { status = 200, code = "ONLINE", msg = "Online" };
}

static SanitizationResult SanitizeInput([FromBody] string input)
{
  return new SanitizationResult
  {
    status = 200,
    result = input
  };
}


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers(
  options =>
  {
    options.InputFormatters.Insert(options.InputFormatters.Count, new TextPlainInputFormatter());
  }
);

var app = builder.Build();
app.MapGet("/", GetStatus);
app.MapPost("/", SanitizeInput);
app.Run($"http://0.0.0.0:{port}");
