// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4iroiqUtF8ZgDgHyFD-RHtrQnCvzsmyg",
  authDomain: "landing-juandaveth.firebaseapp.com",
  projectId: "landing-juandaveth",
  storageBucket: "landing-juandaveth.firebasestorage.app",
  messagingSenderId: "713965784360",
  appId: "1:713965784360:web:bba35adb4d33f6ff1f941d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Manejo del formulario de contacto
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");
    const mensajeInput = document.getElementById("mensaje");

    const nombre = nombreInput.value.trim();
    const correo = correoInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    if (!nombre || !correo || !mensaje) {
      mostrarEstado("Por favor, completa todos los campos.", "error");
      return;
    }

    establecerCargando(true);

    try {
      await addDoc(collection(db, "mensajes"), {
        nombre: nombre,
        correo: correo,
        mensaje: mensaje,
        fecha: serverTimestamp()
      });

      mostrarEstado("¡Mensaje enviado con éxito! Muchas gracias por contactarte.", "success");
      contactForm.reset();
    } catch (error) {
      console.error("Error al guardar el mensaje en Firestore:", error);
      mostrarEstado("Hubo un error al enviar el mensaje. Intenta nuevamente.", "error");
    } finally {
      establecerCargando(false);
    }
  });
}

function establecerCargando(cargando) {
  if (!submitBtn) return;
  submitBtn.disabled = cargando;
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");
  if (btnText && btnLoader) {
    btnText.style.display = cargando ? "none" : "inline";
    btnLoader.style.display = cargando ? "inline" : "none";
  } else {
    submitBtn.textContent = cargando ? "Enviando..." : "Enviar";
  }
}

function mostrarEstado(mensaje, tipo) {
  if (!formStatus) return;
  formStatus.textContent = mensaje;
  formStatus.className = `form-status ${tipo}`;
  formStatus.style.display = "block";
}
