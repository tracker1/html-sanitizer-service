
public class StatusResult
{
  public int status { get; set; }
  public string code { get; set; } = "";
  public string msg { get; set; } = "";
}

public class SanitizationResult
{
  public int status { get; set; }
  public string? result { get; set; } = "";
}

public class SanitizationError
{
  public int status { get; set; }
  public string msg { get; set; } = "";
}
