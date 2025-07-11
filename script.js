// Navegación móvil
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")

        // Cerrar todos los otros items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active")
        })

        // Toggle el item actual
        if (!isActive) {
          item.classList.add("active")
        }
      })
    }
  })

  // Filtros de categorías FAQ
  const categoryBtns = document.querySelectorAll(".category-btn")
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remover active de todos los botones
      categoryBtns.forEach((b) => b.classList.remove("active"))
      // Agregar active al botón clickeado
      btn.classList.add("active")

      const category = btn.getAttribute("data-category")
      const faqItems = document.querySelectorAll(".faq-item")

      faqItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Búsqueda FAQ
  const faqSearch = document.getElementById("faq-search")
  if (faqSearch) {
    faqSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const faqItems = document.querySelectorAll(".faq-item")

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question h3").textContent.toLowerCase()
        const answer = item.querySelector(".faq-answer p").textContent.toLowerCase()

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  }

  // Formulario de contacto
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simular envío
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Enviando..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("¡Mensaje enviado correctamente! Te contactaremos pronto.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Formulario de newsletter
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Suscribiendo..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("¡Te has suscrito correctamente a nuestro newsletter!")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 1500)
    })
  }

  // Formulario de testimonios
  const reviewForm = document.getElementById("review-form")
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Enviando..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("¡Gracias por tu testimonio! Lo revisaremos y publicaremos pronto.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Smooth scrolling para enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Animación de números en stats
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number, .metric-number")
        statNumbers.forEach((number) => {
          animateNumber(number)
        })
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const statsSection = document.querySelector(".stats-section")
  const metricsSection = document.querySelector(".impact-metrics")

  if (statsSection) observer.observe(statsSection)
  if (metricsSection) observer.observe(metricsSection)

  function animateNumber(element) {
    const target = Number.parseInt(element.textContent.replace(/[^\d]/g, ""))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      const originalText = element.textContent
      const suffix = originalText.replace(/[\d,]/g, "")
      element.textContent = Math.floor(current).toLocaleString() + suffix
    }, 16)
  }
})

// Funciones para el modal de aplicaciones de trabajo
function openJobApplication(position) {
  const modal = document.getElementById("application-modal")
  const modalTitle = document.getElementById("modal-title")
  const jobPositionInput = document.getElementById("job-position")

  if (modal && modalTitle && jobPositionInput) {
    const positionTitles = {
      "marketing-digital": "Especialista en Marketing Digital",
      "quimico-cosmetico": "Químico Cosmético",
      "ejecutivo-ventas": "Ejecutivo de Ventas",
      "atencion-cliente": "Asistente de Atención al Cliente",
    }

    modalTitle.textContent = `Postular a: ${positionTitles[position] || "Vacante"}`
    jobPositionInput.value = position
    modal.style.display = "block"
  }
}

function openGeneralApplication() {
  const modal = document.getElementById("application-modal")
  const modalTitle = document.getElementById("modal-title")
  const jobPositionInput = document.getElementById("job-position")

  if (modal && modalTitle && jobPositionInput) {
    modalTitle.textContent = "Enviar CV Espontáneo"
    jobPositionInput.value = "general"
    modal.style.display = "block"
  }
}

function closeModal() {
  const modal = document.getElementById("application-modal")
  if (modal) {
    modal.style.display = "none"
  }
}

// Cerrar modal al hacer click fuera
window.addEventListener("click", (event) => {
  const modal = document.getElementById("application-modal")
  if (event.target === modal) {
    closeModal()
  }
})

// Formulario de aplicación de trabajo
document.addEventListener("DOMContentLoaded", () => {
  const jobApplicationForm = document.getElementById("job-application-form")
  if (jobApplicationForm) {
    jobApplicationForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Enviando..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("¡Aplicación enviada correctamente! Te contactaremos si tu perfil es seleccionado.")
        this.reset()
        closeModal()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
})

// Validación de archivos
document.addEventListener("DOMContentLoaded", () => {
  const cvInput = document.getElementById("applicant-cv")
  if (cvInput) {
    cvInput.addEventListener("change", function () {
      const file = this.files[0]
      if (file) {
        const fileSize = file.size / 1024 / 1024 // MB
        const fileType = file.type

        if (fileSize > 5) {
          alert("El archivo es demasiado grande. Máximo 5MB.")
          this.value = ""
          return
        }

        if (fileType !== "application/pdf") {
          alert("Solo se aceptan archivos PDF.")
          this.value = ""
          return
        }
      }
    })
  }
})

// Efectos de parallax suave
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero, .page-hero")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Lazy loading para imágenes
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="placeholder.svg"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // Aquí podrías cargar la imagen real
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Función para mostrar/ocultar elementos basado en scroll
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".feature-card, .service-card, .product-card, .article-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", handleScrollAnimations)

// Función para el buscador de tiendas
document.addEventListener("DOMContentLoaded", () => {
  const locationForm = document.querySelector(".location-form")
  if (locationForm) {
    locationForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const city = document.getElementById("city").value
      const storeType = document.getElementById("store-type").value

      if (!city) {
        alert("Por favor selecciona una ciudad")
        return
      }

      // Simular búsqueda
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Buscando..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert(
          `Encontramos 5 tiendas en ${city} ${storeType ? "del tipo " + storeType : ""}. Te enviaremos la lista por email.`,
        )
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 1500)
    })
  }
})

// Función para rating de estrellas en testimonios
document.addEventListener("DOMContentLoaded", () => {
  const ratingInputs = document.querySelectorAll('.rating-input input[type="radio"]')
  ratingInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const rating = this.value
      const labels = this.closest(".rating-input").querySelectorAll("label")

      labels.forEach((label, index) => {
        if (index < rating) {
          label.style.color = "#D4A574"
        } else {
          label.style.color = "#ccc"
        }
      })
    })
  })
})
