console.log("MXGuide app.js v2 cargado");
// Lee data.json y llena index.html. Para cambiar textos, solo edita data.json.
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const lista = (id, items) => { $(id).innerHTML = items.map((t) => `<li>${esc(t)}</li>`).join(""); };
const tarjetas = (arr) => arr.map((f) => `<div class="card"><div class="ic">${esc(f.icono)}</div><h3>${esc(f.titulo)}</h3><p>${esc(f.texto)}</p></div>`).join("");

// Botón para agrandar la letra (se recuerda si el navegador lo permite)
try { if (localStorage.getItem("big") === "1") document.documentElement.classList.add("big"); } catch (e) {}
$("zoom").onclick = () => {
  const big = document.documentElement.classList.toggle("big");
  try { localStorage.setItem("big", big ? "1" : "0"); } catch (e) {}
};

fetch("data.json")
  .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then((d) => {
    document.title = `${d.nombre} · ${d.lema}`;
    $("tagline").textContent = d.lema;
    $("intro").textContent = d.intro;
    $("que").textContent = d.que;
    $("para").innerHTML = tarjetas(d.para);
    $("features").innerHTML = tarjetas(d.funciones);
    $("steps").innerHTML = d.pasos.map((p) => `<div class="step"><p>${esc(p)}</p></div>`).join("");
    lista("done", d.avance.listo);
    lista("wip", d.avance.trabajando);
    lista("todo", d.avance.pronto);
    $("descarga").innerHTML = d.descarga.url
      ? `<a class="btn p" href="${esc(d.descarga.url)}">${esc(d.descarga.texto)}</a>`
      : `<span class="badge">${esc(d.descarga.texto)}</span>`;
    $("faq").innerHTML = d.faq.map((q) => `<details><summary>${esc(q.p)}</summary><p>${esc(q.r)}</p></details>`).join("");
    $("ayuda-txt").textContent = d.contacto.texto;
    iniciarFormulario(d.contacto);
    $("repo").href = d.repo;
    $("footer").textContent = d.pie;
  })
  .catch(() => {
    $("intro").innerHTML = '<span class="err">No se pudo cargar la información. Si abriste el archivo con doble clic, usa un servidor local (por ejemplo <code>npx serve docs</code>).</span>';
  });

// Formulario: cada mensaje llega directo al correo del equipo (servicio FormSubmit).
function iniciarFormulario(c) {
  $("tipo").innerHTML = c.tipos.map((t) => `<option>${esc(t)}</option>`).join("");
  const form = $("form"), msg = $("msg"), btn = $("enviar");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.className = "msg";
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const datos = Object.fromEntries(new FormData(form));
    datos._subject = `MXGuide · ${datos.tipo}`;
    datos._template = "table";
    datos._captcha = "false";
    btn.disabled = true; btn.textContent = "Enviando…";
    try {
      const r = await fetch("https://formsubmit.co/ajax/" + c.correo, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(datos),
      });
      const res = await r.json();
      if (!r.ok || res.success === "false" || res.success === false) throw new Error(res.message || r.status);
      form.reset();
      msg.className = "msg ok";
      msg.textContent = "¡Gracias! Recibimos tu mensaje y te responderemos pronto.";
    } catch (err) {
      console.error("Error al enviar:", err);
      if (err instanceof TypeError) {
        // Bloqueo de red/CORS: se envía como formulario normal en un iframe oculto (sin leer la respuesta).
        enviarPorIframe(c.correo, datos);
        form.reset();
        msg.className = "msg ok";
        msg.textContent = "¡Gracias! Enviamos tu mensaje. Si en unos días no te respondemos, escríbenos a " + c.correo + ".";
        btn.disabled = false; btn.textContent = "Enviar mensaje";
        return;
      }
      msg.className = "msg no";
      msg.innerHTML = `No se pudo enviar. Intenta de nuevo o escríbenos a <a href="mailto:${esc(c.correo)}">${esc(c.correo)}</a>.<br><small>Detalle técnico: ${esc(err.message || err)}</small>`;
    }
    btn.disabled = false; btn.textContent = "Enviar mensaje";
  });
}

function enviarPorIframe(correo, datos) {
  const nombre = "fs_" + Date.now();
  const iframe = document.createElement("iframe");
  iframe.name = nombre; iframe.hidden = true;
  const f = document.createElement("form");
  f.method = "POST"; f.action = "https://formsubmit.co/" + correo; f.target = nombre; f.hidden = true;
  for (const [k, v] of Object.entries(datos)) {
    const i = document.createElement("input");
    i.type = "hidden"; i.name = k; i.value = v; f.appendChild(i);
  }
  document.body.append(iframe, f);
  f.submit();
  setTimeout(() => { iframe.remove(); f.remove(); }, 15000);
}
