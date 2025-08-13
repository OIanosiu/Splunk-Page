module.exports = async function (context, req) {
    const html = `<!doctype html>
  <html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Please wait…</title>
  <style>
    :root { --bg:#f8f9fb; --card:#fff; --fg:#1f2937; --muted:#6b7280; --accent:#2563eb; }
    *{ box-sizing:border-box; } body{ margin:0; font-family:Segoe UI, system-ui, -apple-system, Roboto, Arial, sans-serif; background:var(--bg); color:var(--fg); }
    .wrap{ min-height:100svh; display:grid; place-items:center; padding:24px; }
    .card{ width:100%; max-width:640px; background:var(--card); border-radius:16px; box-shadow:0 8px 28px rgba(0,0,0,.08); padding:28px; }
    .row{ display:flex; align-items:center; gap:14px; }
    .spinner{ width:36px; height:36px; border-radius:50%; border:4px solid #e5e7eb; border-top-color:var(--accent); animation:spin 1s linear infinite; }
    @keyframes spin{ to{ transform:rotate(360deg) } }
    h1{ font-size:20px; margin:0 0 6px; } p{ margin:6px 0; line-height:1.6; } .muted{ color:var(--muted); }
    .actions{ display:flex; flex-wrap:wrap; gap:10px; margin-top:14px; }
    .btn{ appearance:none; border:0; border-radius:8px; padding:9px 12px; font-weight:600; cursor:pointer; }
    .btn.primary{ background:var(--accent); color:#fff; } .btn.secondary{ background:#e5e7eb; color:#111; }
    .small{ font-size:13px; }
  </style></head>
  <body><div class="wrap"><section class="card" role="status" aria-live="polite">
  <div class="row"><div class="spinner" aria-hidden="true"></div><div>
  <h1>Please wait while we complete your setup</h1>
  <p class="muted">Your access will be ready in a moment. We’ll retry automatically.</p>
  </div></div>
  <p class="small muted" id="countdown">Retrying in <b><span id="sec">5</span>s</b>…</p>
  <div class="actions">
    <button class="btn primary" id="retryNow">Retry now</button>
    <button class="btn secondary" id="stop">Stop auto‑retry</button>
  </div>
  </section></div>
  <script>
  (function(){
    const url = new URL(location.href);
    const returnUrl = url.searchParams.get("return") || "";
    const totalSeconds = 5; const intervalMs = 4000;
    const secEl = document.getElementById("sec");
    const countdownEl = document.getElementById("countdown");
    const retryBtn = document.getElementById("retryNow");
    const stopBtn = document.getElementById("stop");
    let remain = totalSeconds; let t1=null, t2=null;
    function go(){
      if (returnUrl) { window.location.replace(returnUrl); }
      else if (document.referrer) { window.location.href = document.referrer; }
      else { window.location.reload(); }
    }
    function startCountdown(){
      secEl.textContent = remain;
      t1 = setInterval(()=>{ remain -= 1; secEl.textContent = remain; if (remain<=0){ clearInterval(t1); go(); startRetryLoop(); } }, 1000);
    }
    function startRetryLoop(){ t2 = setInterval(()=>go(), intervalMs); countdownEl.textContent = "Retrying automatically…"; }
    function stopAll(){ clearInterval(t1); clearInterval(t2); countdownEl.textContent = "Auto‑retry paused."; }
    retryBtn.addEventListener("click", go); stopBtn.addEventListener("click", stopAll);
    startCountdown();
  })();
  </script>
  </body></html>`;
    context.res = { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" }, body: html };
  };
  