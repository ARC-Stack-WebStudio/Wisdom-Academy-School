const $ = (s, p = document) => p.querySelector(s), $$ = (s, p = document) => [...p.querySelectorAll(s)];
const header = $("#header"), menu = $(".menu-toggle"), nav = $(".nav");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 40), { passive: true });
menu.addEventListener("click", () => { menu.classList.toggle("open"); nav.classList.toggle("open"); menu.setAttribute("aria-expanded", menu.classList.contains("open")) });
$$(".nav a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); nav.classList.remove("open") }));

let heroIndex = 0; const slides = $$(".hero-slide"), dots = $$(".hero-pagination button");
function showHero(i) { heroIndex = i; slides.forEach((s, n) => s.classList.toggle("active", n === i)); dots.forEach((d, n) => d.classList.toggle("active", n === i)) }
dots.forEach(d => d.addEventListener("click", () => showHero(+d.dataset.slide)));
setInterval(() => showHero((heroIndex + 1) % slides.length), 6500);

const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) } }), { threshold: .12 });
$$(".reveal,.reveal-left,.reveal-right").forEach(el => observer.observe(el));
const counterObserver = new IntersectionObserver(entries => entries.forEach(e => { if (!e.isIntersecting) return; const el = e.target, target = +el.dataset.count, start = performance.now(), duration = 1500; function tick(now) { const p = Math.min((now - start) / duration, 1); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(tick) } requestAnimationFrame(tick); counterObserver.unobserve(el) }), { threshold: .7 });
$$("[data-count]").forEach(el => counterObserver.observe(el));

const rail = $(".facility-rail"); $(".rail-next").onclick = () => rail.scrollBy({ left: 460, behavior: "smooth" }); $(".rail-prev").onclick = () => rail.scrollBy({ left: -460, behavior: "smooth" });
let testimonial = 0; const track = $(".testimonial-track"), current = $(".testimonial-controls b");
function setTestimonial(i) { testimonial = (i + 2) % 2; track.style.transform = `translateX(-${testimonial * 100}%)`; current.textContent = `0${testimonial + 1}` }
$(".test-next").onclick = () => setTestimonial(testimonial + 1); $(".test-prev").onclick = () => setTestimonial(testimonial - 1);



function openModal(modal) { modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden" }
function closeModal(modal) { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = "" }
const videoModal = $(".video-modal"), lightbox = $(".lightbox");
$$(".open-video").forEach(b => b.addEventListener("click", () => openModal(videoModal)));
$$(".modal-close").forEach(b => b.addEventListener("click", () => closeModal(b.closest(".modal"))));
$$(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModal(m) }));
$$(".gallery-item").forEach(item => item.addEventListener("click", () => { $("img", lightbox).src = $("img", item).src; $("figcaption", lightbox).textContent = item.dataset.caption; openModal(lightbox) }));
addEventListener("keydown", e => { if (e.key === "Escape") $$(".modal.open").forEach(closeModal) });



addEventListener("mousemove", e => { const glow = $(".cursor-glow"); glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px" }, { passive: true });
$$(".ripple").forEach(btn => btn.addEventListener("click", e => { const r = document.createElement("i"), box = btn.getBoundingClientRect(); r.style.cssText = `position:absolute;left:${e.clientX - box.left}px;top:${e.clientY - box.top}px;width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.5);transform:translate(-50%,-50%);animation:ripple .6s ease-out;pointer-events:none`; btn.style.position = "relative"; btn.style.overflow = "hidden"; btn.appendChild(r); setTimeout(() => r.remove(), 650) }));
const style = document.createElement("style"); style.textContent = "@keyframes ripple{to{transform:translate(-50%,-50%) scale(25);opacity:0}}"; document.head.appendChild(style);

addEventListener("scroll", () => { const y = scrollY; $$(".hero-slide").forEach(s => s.style.backgroundPosition = `center calc(50% + ${y * .12}px)`) }, { passive: true });



