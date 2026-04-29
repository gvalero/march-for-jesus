param(
  [Parameter(Mandatory = $false)]
  [string] $FlowUrl = $env:MFJ_POWER_AUTOMATE_WEBHOOK_URL,

  [Parameter(Mandatory = $false)]
  [string] $PayloadPath = "$PSScriptRoot\power-automate-order-payload.example.json"
)

if (-not $FlowUrl) {
  throw "Set MFJ_POWER_AUTOMATE_WEBHOOK_URL or pass -FlowUrl before running this test."
}

if (-not (Test-Path $PayloadPath)) {
  throw "Payload file not found: $PayloadPath"
}

$payload = Get-Content $PayloadPath -Raw
$response = Invoke-WebRequest -Uri $FlowUrl -Method Post -ContentType "application/json" -Body $payload -UseBasicParsing

[pscustomobject]@{
  StatusCode = $response.StatusCode
  StatusDescription = $response.StatusDescription
  ResponseLength = $response.Content.Length
}
