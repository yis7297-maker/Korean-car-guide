param(
  [string]$Root,
  [int]$Port = 8765
)

$server = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
$server.Start()
$rootPath = [IO.Path]::GetFullPath($Root)
$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.txt'  = 'text/plain; charset=utf-8'
  '.xml'  = 'application/xml; charset=utf-8'
}

while ($true) {
  $client = $server.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
    $requestLine = $reader.ReadLine()
    while ($reader.ReadLine()) {}

    $target = ($requestLine -split ' ')[1]
    $pathOnly = ([Uri]("http://localhost$target")).AbsolutePath.TrimStart('/')
    if (-not $pathOnly) { $pathOnly = 'index.html' }
    $relative = [Uri]::UnescapeDataString($pathOnly)
    $candidate = [IO.Path]::GetFullPath((Join-Path $rootPath $relative))

    if ($candidate.StartsWith($rootPath, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $candidate -PathType Leaf)) {
      $body = [IO.File]::ReadAllBytes($candidate)
      $extension = [IO.Path]::GetExtension($candidate).ToLowerInvariant()
      $contentType = $mime[$extension]
      if (-not $contentType) { $contentType = 'application/octet-stream' }
      $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    } else {
      $body = [Text.Encoding]::UTF8.GetBytes('Not Found')
      $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    }

    $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    $stream.Write($body, 0, $body.Length)
    $stream.Flush()
  } finally {
    $client.Close()
  }
}
