$content = Get-Content "d:\Labkhand\my-app\src\register\index.js" -Raw
$old = @"const supabase = createClient(
    "https://xecdqvinprrsugkcvutb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgZiSK5bbs-HEN1IdEEFezp0"
);"@
$new = 'const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL || "/api/supabase",
    process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgZiSK5bbs-HEN1IdEEFezp0"
);'
$content = $content -replace $old, $new
$content | Set-Content "d:\Labkhand\my-app\src\register\index.js"
