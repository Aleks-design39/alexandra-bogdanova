(function () {
  const data = window.resumeContent;
  if (!data) return;
  const set = (name, value) => document.querySelectorAll(`[data-field="${name}"]`).forEach(el => { el.textContent = value || ""; });
  ["name", "heroLine1", "heroProof", "shortName", "initials", "role", "location", "intro", "about", "contactIntro"].forEach(key => set(key, data[key]));
  set("footerName", data.fullName);
  document.title = `${data.fullName} — руководитель проектов и помощник руководителя`;
  document.querySelector('meta[name="description"]').content = `${data.fullName}: управление проектами, команда, процессы и отчётность. Опыт, результаты и работы.`;

  const skills = document.getElementById("skills");
  (data.skills || []).forEach(skill => {
    const item = document.createElement("span");
    item.className = "skill";
    item.textContent = skill;
    skills.append(item);
  });

  const proof = document.getElementById("proof-list");
  (data.proof || []).forEach(item => {
    const row = document.createElement("div"); row.className = "proof-row";
    const value = document.createElement("strong"); value.textContent = item.value;
    const label = document.createElement("span"); label.textContent = item.label;
    row.append(value, label); proof.append(row);
  });

  const valueList = document.getElementById("value-list");
  (data.value || []).forEach(item => {
    const row = document.createElement("article"); row.className = "value-row";
    const number = document.createElement("span"); number.className = "value-number"; number.textContent = item.number;
    const body = document.createElement("div");
    const title = document.createElement("h3"); title.textContent = item.title;
    const description = document.createElement("p"); description.textContent = item.description;
    body.append(title, description); row.append(number, body); valueList.append(row);
  });

  const detailDialog = document.getElementById("detail-dialog");
  const detailClose = document.getElementById("detail-close");
  let detailTrigger;
  const openDetails = (item, trigger) => {
    const details = item.details;
    if (!details) return;
    detailTrigger = trigger;
    document.getElementById("detail-period").textContent = item.period;
    document.getElementById("detail-title").textContent = item.role;
    document.getElementById("detail-company").textContent = item.company;
    document.getElementById("detail-lead").textContent = details.lead;

    const metrics = document.getElementById("detail-metrics");
    metrics.replaceChildren();
    (details.metrics || []).forEach(metric => {
      const card = document.createElement("div"); card.className = "detail-metric";
      const value = document.createElement("strong"); value.textContent = metric.value;
      const label = document.createElement("span"); label.textContent = metric.label;
      card.append(value, label); metrics.append(card);
    });

    const sections = document.getElementById("detail-sections");
    sections.replaceChildren();
    (details.sections || []).forEach(section => {
      const block = document.createElement("section"); block.className = "detail-section";
      const heading = document.createElement("h3"); heading.textContent = section.title;
      const list = document.createElement("ul");
      section.items.forEach(text => {
        const point = document.createElement("li"); point.textContent = text; list.append(point);
      });
      block.append(heading, list); sections.append(block);
    });
    detailDialog.scrollTop = 0;
    detailDialog.showModal();
    detailClose.focus();
  };
  detailClose.addEventListener("click", () => detailDialog.close());
  detailDialog.addEventListener("click", event => { if (event.target === detailDialog) detailDialog.close(); });
  detailDialog.addEventListener("close", () => detailTrigger?.focus());

  const experience = document.getElementById("experience-list");
  (data.experience || []).forEach(item => {
    const row = document.createElement("article");
    row.className = "timeline-row";
    const period = document.createElement("div"); period.className = "timeline-period"; period.textContent = item.period;
    const body = document.createElement("div"); body.className = "timeline-body";
    const title = document.createElement("h3"); title.textContent = item.role;
    const company = document.createElement("p"); company.className = "timeline-company"; company.textContent = item.company;
    const description = document.createElement("p"); description.className = "timeline-description"; description.textContent = item.description;
    body.append(title, company, description);
    if (item.details) {
      const more = document.createElement("button");
      more.type = "button"; more.className = "timeline-more";
      more.textContent = "Подробнее ↗";
      more.setAttribute("aria-label", `Подробнее об опыте: ${item.company}`);
      more.dataset.umamiEvent = `Клик: подробности ${item.company}`;
      more.addEventListener("click", () => openDetails(item, more));
      body.append(more);
    }
    row.append(period, body); experience.append(row);
  });

  const projects = document.getElementById("project-list");
  (data.projects || []).forEach(item => {
    const row = document.createElement("article"); row.className = "project-row";
    const imageLink = document.createElement("a"); imageLink.href = item.url; imageLink.target = "_blank"; imageLink.rel = "noopener noreferrer"; imageLink.className = "project-image-link"; imageLink.setAttribute("aria-label", `Открыть проект ${item.title} на Behance`); imageLink.dataset.umamiEvent = `Клик: проект ${item.title}`;
    const image = document.createElement("img"); image.src = item.image; image.alt = item.title; image.loading = "lazy"; image.decoding = "async"; imageLink.append(image);
    const body = document.createElement("div"); body.className = "project-body";
    const category = document.createElement("p"); category.className = "project-category"; category.textContent = item.category;
    const title = document.createElement("h3"); const titleLink = document.createElement("a"); titleLink.href = item.url; titleLink.target = "_blank"; titleLink.rel = "noopener noreferrer"; titleLink.textContent = item.title; titleLink.dataset.umamiEvent = `Клик: проект ${item.title}`; title.append(titleLink);
    const description = document.createElement("p"); description.textContent = item.description;
    body.append(category, title, description);
    row.append(imageLink, body);
    if (item.url) {
      const link = document.createElement("a"); link.href = item.url; link.target = "_blank"; link.rel = "noopener noreferrer"; link.className = "project-arrow"; link.setAttribute("aria-label", `Открыть проект ${item.title}`); link.textContent = "↗"; link.dataset.umamiEvent = `Клик: проект ${item.title}`; row.append(link);
    }
    projects.append(row);
  });

  const contacts = document.getElementById("contact-links");
  (data.contacts || []).forEach(item => {
    const link = document.createElement("a"); link.href = item.url; link.className = "contact-link";
    if (item.label === "Telegram") link.dataset.umamiEvent = "Клик: Telegram";
    if (item.label === "Behance") link.dataset.umamiEvent = "Клик: Behance";
    if (!item.url.startsWith("mailto:") && !item.url.startsWith("tel:")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    const label = document.createElement("span"); label.textContent = item.label;
    const arrow = document.createElement("span"); arrow.setAttribute("aria-hidden", "true"); arrow.textContent = "↗";
    link.append(label, arrow); contacts.append(link);
  });
  if (!data.contacts?.length) {
    const note = document.createElement("p"); note.className = "contact-note"; note.textContent = "Контакты появятся здесь после заполнения резюме."; contacts.append(note);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const animated = document.querySelectorAll(".section-heading, .about-body, .value-row, .timeline-row, .project-row, .contact h2, .contact>p, .contact-links");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -35px 0px" });
  animated.forEach(el => { el.classList.add("reveal"); observer.observe(el); });
})();
