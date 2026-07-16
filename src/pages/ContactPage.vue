<template>
    <div class="responsive-container">
        <div class="contact-container">
            <div class="form-container">
                <div v-if="message.show" :class="['message', message.type]">
                    {{ message.text }}
                </div>

                <form @submit.prevent="submitContact">
                    <label for="full_name">Nombre Completo:</label>
                    <input
                        type="text"
                        id="full_name"
                        v-model="form.full_name"
                        required
                    />

                    <label for="phone">Teléfono:</label>
                    <input
                        type="text"
                        id="phone"
                        v-model="form.phone"
                        required
                    />

                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        v-model="form.email"
                        required
                    />

                    <label for="subject">Asunto:</label>
                    <input
                        type="text"
                        id="subject"
                        v-model="form.subject"
                        required
                    />

                    <label for="message_field">Mensaje:</label>
                    <textarea
                        id="message_field"
                        v-model="form.message"
                        required
                    ></textarea>

                    <button type="submit" :disabled="isSubmitting">
                        {{ isSubmitting ? "Enviando..." : "Enviar" }}
                    </button>
                </form>
            </div>

            <div class="contact-info">
                <h2>Información de Contacto</h2>
                <p><strong>Teléfono:</strong> +54 9 3471 630170</p>
                <p><strong>Email:</strong> mauro.vicens@gmail.com</p>
                <p><strong>Dirección:</strong> Armstrong, Argentina</p>
                <p><strong>Horarios:</strong> Lunes - Viernes: 9am - 5pm</p>

                <div class="contact-social">
                    <a href="https://github.com/mocenslabs" class="social-link">
                        <i class="bi bi-github"></i>
                    </a>
                    <a
                        href="https://linkedin.com/in/mauro-andres-vicens"
                        class="social-link"
                    >
                        <i class="bi bi-linkedin"></i>
                    </a>
                    <a
                        href="https://instagram.com/mocens.labs"
                        class="social-link"
                    >
                        <i class="bi bi-instagram"></i>
                    </a>
                    <a href="https://t.me/mocenslabs" class="social-link">
                        <i class="bi bi-telegram"></i>
                    </a>
                    <a href="https://wa.me/5493471630170" class="social-link">
                        <i class="bi bi-whatsapp"></i>
                    </a>
                </div>
            </div>
        </div>

        <!-- Footer component - asumiendo que ya tienes un componente equivalente -->
        <!-- <Footer /> -->
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

// Estado reactivo del formulario
const form = reactive({
    full_name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
});

// Estado del mensaje de respuesta
const message = reactive({
    show: false,
    text: "",
    type: "", // 'success' o 'error'
});

// Estado de carga
const isSubmitting = ref(false);

// Función para enviar el formulario
const submitContact = async () => {
    isSubmitting.value = true;
    message.show = false;

    try {
        const formData = new FormData();
        formData.append("full_name", form.full_name);
        formData.append("phone", form.phone);
        formData.append("email", form.email);
        formData.append("subject", form.subject);
        formData.append("message", form.message);

        const response = await fetch(
            "https://portfolio-blackeagle.fly.dev/api/contact/",
            {
                method: "POST",
                body: formData,
            },
        );

        if (response.status === 201) {
            // Éxito
            message.text = "Mensaje enviado correctamente.";
            message.type = "success";
            message.show = true;

            // Limpiar formulario
            resetForm();
        } else {
            // Error del servidor
            message.text = "Hubo un error al enviar el mensaje.";
            message.type = "error";
            message.show = true;
        }
    } catch (error) {
        // Error de red
        message.text = "Error en la solicitud.";
        message.type = "error";
        message.show = true;
        console.error("Error:", error);
    } finally {
        isSubmitting.value = false;
    }
};

// Función para limpiar el formulario
const resetForm = () => {
    form.full_name = "";
    form.phone = "";
    form.email = "";
    form.subject = "";
    form.message = "";
};

// Configurar el título de la página al montar el componente
onMounted(() => {
    document.title = "Contacto";

    // Agregar el favicon si no existe
    if (!document.querySelector('link[rel="shortcut icon"]')) {
        const favicon = document.createElement("link");
        favicon.rel = "shortcut icon";
        favicon.href = "/assets/bedhs.ico";
        favicon.type = "image/x-icon";
        document.head.appendChild(favicon);
    }

    // Agregar Bootstrap Icons si no existe
    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
        const bootstrapIcons = document.createElement("link");
        bootstrapIcons.rel = "stylesheet";
        bootstrapIcons.href =
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
        document.head.appendChild(bootstrapIcons);
    }
});
</script>

<style scoped>
/* CSS para el formulario de contacto y la información de contacto */

/* Contenedor principal para el formulario y la información de contacto */
.contact-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 40px auto;
    margin-top: 120px;
    width: 85%; /* Más amplio para desktop */
    max-width: 1200px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
    backdrop-filter: blur(10px);
    padding: 50px;
    border-radius: 25px;
    box-shadow:
        0 25px 50px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    min-height: 70vh;
    overflow: hidden;
}

/* Efectos decorativos */
.contact-container::after {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
        circle,
        rgba(255, 102, 0, 0.1) 0%,
        transparent 70%
    );
    pointer-events: none;
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Línea divisoria moderna */
.contact-container::before {
    content: "";
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 50%;
    width: 2px;
    background: linear-gradient(to bottom, transparent, #ff6600, transparent);
    border-radius: 1px;
    z-index: 1;
}

/* Estilos generales del formulario */
.form-container {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 40px;
    z-index: 2;
    position: relative;
}

.form-container label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.form-container input,
.form-container textarea {
    width: 100%;
    padding: 16px 20px;
    margin-bottom: 20px;
    border: 2px solid transparent;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-sizing: border-box;
    font-size: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-container input:focus,
.form-container textarea:focus {
    outline: none;
    border-color: #ff6600;
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow:
        0 8px 25px rgba(255, 102, 0, 0.2),
        0 0 0 3px rgba(255, 102, 0, 0.1);
}

.form-container textarea {
    height: 140px;
    resize: vertical;
    min-height: 100px;
}

.form-container button {
    background: linear-gradient(135deg, #ff6600 0%, #cc5200 100%);
    color: white;
    font-weight: 700;
    border: none;
    padding: 16px 32px;
    border-radius: 50px;
    cursor: pointer;
    float: right;
    margin-top: 20px;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
        0 8px 20px rgba(255, 102, 0, 0.3),
        0 0 0 0 rgba(255, 102, 0, 0.4);
    position: relative;
    overflow: hidden;
}

.form-container button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: left 0.5s;
}

.form-container button:hover::before {
    left: 100%;
}

.form-container button:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow:
        0 12px 30px rgba(255, 102, 0, 0.4),
        0 0 0 5px rgba(255, 102, 0, 0.1);
}

.form-container button:active {
    transform: translateY(-1px);
}

.form-container button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

/* Estilos para los mensajes de éxito y error */
.message {
    padding: 16px 20px;
    margin-bottom: 25px;
    border-radius: 12px;
    font-weight: 600;
    border: none;
    animation: slideIn 0.5s ease-out;
    backdrop-filter: blur(5px);
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.message.success {
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    color: #155724;
    box-shadow: 0 4px 15px rgba(21, 87, 36, 0.2);
}

.message.error {
    background: linear-gradient(135deg, #f8d7da, #f5c6cb);
    color: #721c24;
    box-shadow: 0 4px 15px rgba(114, 28, 36, 0.2);
}

/* Estilos para la información de contacto */
.contact-info {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 40px;
    text-align: left;
    z-index: 2;
    position: relative;
}

.contact-info h2 {
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 2.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2c3e50, #ff6600);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.contact-info p {
    margin-bottom: 18px;
    font-size: 17px;
    line-height: 1.6;
    color: #34495e;
    padding: 12px 0;
    border-left: 3px solid transparent;
    padding-left: 16px;
    transition: all 0.3s ease;
}

.contact-info p:hover {
    border-left-color: #ff6600;
    transform: translateX(5px);
    background: rgba(255, 102, 0, 0.05);
    border-radius: 0 8px 8px 0;
}

.contact-info strong {
    color: #2c3e50;
    font-weight: 700;
}

.contact-social {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    margin-top: 35px;
    flex-wrap: wrap;
}

.social-link {
    color: #34495e;
    font-size: 28px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
}

.social-link:hover {
    color: white;
    background: linear-gradient(135deg, #ff6600, #cc5200);
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 102, 0, 0.4);
}

/* Media Queries para móviles */
@media (max-width: 768px) {
    .contact-container {
        flex-direction: column;
        align-items: center;
        padding: 30px 20px;
        width: 95%;
        height: auto;
        margin-top: 100px;
        min-height: auto;
    }

    .contact-container::before {
        display: none;
    }

    .contact-container::after {
        display: none;
    }

    .form-container,
    .contact-info {
        width: 100%;
        margin-bottom: 30px;
        padding: 0;
    }

    .contact-info {
        text-align: center;
        margin-top: 40px;
    }

    .contact-info h2 {
        font-size: 1.8rem;
        margin-bottom: 25px;
    }

    .contact-info p {
        text-align: left;
        margin-bottom: 15px;
    }

    .form-container button {
        width: 50%;
        float: none;
        margin: 20px auto 0;
        display: block;
    }

    .form-container textarea {
        height: 120px;
    }

    .contact-social {
        justify-content: center;
        margin-top: 25px;
    }

    .social-link {
        font-size: 24px;
        width: 48px;
        height: 48px;
    }
}

@media (max-width: 480px) {
    .contact-container {
        padding: 20px 15px;
        margin-top: 80px;
    }

    .contact-info h2 {
        font-size: 1.6rem;
    }

    .form-container input,
    .form-container textarea {
        padding: 14px 16px;
        font-size: 15px;
    }

    .form-container button {
        width: 70%;
        padding: 14px 24px;
        font-size: 15px;
    }
}
</style>
