function goToURL(url) {
  window.open(url, "_blank");
}

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 100);

  const progress = document.getElementById("scroll-progress");
  if (progress) {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progress.style.width = scrollPercent + "%";
  }

  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 150) {
    navbar.style.top = "-80px";
  } else {
    navbar.style.top = "0";
  }
  lastScroll = currentScroll;
});

const navbarToggle = document.getElementById("navbar-toggle");
const navbarMenu = document.getElementById("navbar-menu");
if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
    navbarToggle.classList.toggle("open");
  });

  document.querySelectorAll("#navbar-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      navbarToggle.classList.remove("open");
    });
  });
}

window.addEventListener("load", () => {
  const existingToast = document.getElementById("toast");
  if (!existingToast) {
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.textContent = "👋 Welcome to TOOL-BELT — your productivity hub!";
    document.body.appendChild(toast);
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0, 0, 0, 0.85)",
      color: "white",
      padding: "15px 25px",
      borderRadius: "30px",
      fontSize: "1rem",
      zIndex: "2000",
      opacity: "0",
      transition: "opacity 0.5s ease"
    });
    setTimeout(() => (toast.style.opacity = "1"), 300);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
});
document.querySelectorAll(".main-pages").forEach(el => observer.observe(el));

const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const query = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".main-pages");
    const headers = document.querySelectorAll(".main-headers");

    if (query === "") {
      cards.forEach(card => (card.style.display = "flex"));
      headers.forEach(header => (header.style.display = "block"));
      return;
    }

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "flex" : "none";
    });

    headers.forEach(header => {
      const section = header.parentElement;
      const visibleCards = section.querySelectorAll(".main-pages");
      const hasVisible = Array.from(visibleCards).some(c => c.style.display === "flex");
      header.style.display = hasVisible ? "block" : "none";
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "/") {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === "Escape") {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
    }
  });
}

const footerYear = document.getElementById("year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.textContent = "↑";
document.body.appendChild(backToTop);
Object.assign(backToTop.style, {
  position: "fixed",
  bottom: "40px",
  right: "30px",
  background: "limegreen",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "50%",
  fontSize: "1.2rem",
  cursor: "pointer",
  opacity: "0",
  transition: "opacity 0.3s ease",
  zIndex: "1000"
});

window.addEventListener("scroll", () => {
  backToTop.style.opacity = window.scrollY > 300 ? "1" : "0";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
