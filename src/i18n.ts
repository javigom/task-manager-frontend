import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: {
            "app.title": "Task Manager",
            "nav.profile": "Profile",
            "nav.login": "Login",
            "nav.register": "Register",

            "login.title": "Login",
            "login.email": "Email",
            "login.password": "Password",
            "login.submit": "Sign in",
            "login.register": "Register",
            "login.success": "Authenticated",
            "login.error": "Login error",

            "register.title": "Register",
            "register.email": "Email",
            "register.fullname": "Full name",
            "register.password": "Password",
            "register.password_hint": "Minimum 8 characters, uppercase, lowercase and number.",
            "register.submit": "Create account",
            "register.success": "Registration successful. Redirecting to login...",
            "register.error": "Registration error",
            "register.validation.min_length": "Password must have at least 8 characters",
            "register.validation.max_length": "Password is too long",
            "register.validation.uppercase": "Password must contain at least one uppercase letter",
            "register.validation.lowercase": "Password must contain at least one lowercase letter",
            "register.validation.digit": "Password must contain at least one number",

            "dashboard.title": "Dashboard",
            "dashboard.create": "Create task",
            "dashboard.tasks_title": "Your tasks",
            "dashboard.title_placeholder": "Title",
            "dashboard.description_placeholder": "Description (optional)",
            "dashboard.create_btn": "Create",
            "dashboard.loading": "Loading tasks...",
            "dashboard.no_tasks": "You have no tasks yet.",
            "dashboard.error": "Error loading tasks",

            "profile.title": "Profile",
            "profile.user": "User: {{user}}",
            "profile.logout": "Sign out"
        }
    },
    es: {
        translation: {
            "app.title": "Gestor de Tareas",
            "nav.profile": "Perfil",
            "nav.login": "Login",
            "nav.register": "Registrar",

            "login.title": "Login",
            "login.email": "Email",
            "login.password": "Contraseña",
            "login.submit": "Entrar",
            "login.register": "Registrar",
            "login.success": "Autenticado",
            "login.error": "Error de login",

            "register.title": "Registrar usuario",
            "register.email": "Email",
            "register.fullname": "Nombre completo",
            "register.password": "Contraseña",
            "register.password_hint": "Mínimo 8 caracteres, mayúscula, minúscula y número.",
            "register.submit": "Crear cuenta",
            "register.success": "Registro exitoso. Redirigiendo al login...",
            "register.error": "Error en el registro",
            "register.validation.min_length": "La contraseña debe tener al menos 8 caracteres",
            "register.validation.max_length": "La contraseña es demasiado larga",
            "register.validation.uppercase": "La contraseña debe contener al menos una mayúscula",
            "register.validation.lowercase": "La contraseña debe contener al menos una minúscula",
            "register.validation.digit": "La contraseña debe contener al menos un número",

            "dashboard.title": "Panel",
            "dashboard.create": "Crear tarea",
            "dashboard.tasks_title": "Tus tareas",
            "dashboard.title_placeholder": "Título",
            "dashboard.description_placeholder": "Descripción (opcional)",
            "dashboard.create_btn": "Crear",
            "dashboard.loading": "Cargando tareas...",
            "dashboard.no_tasks": "No tienes tareas aún.",
            "dashboard.error": "Error cargando tareas",

            "profile.title": "Perfil",
            "profile.user": "Usuario: {{user}}",
            "profile.logout": "Cerrar sesión"
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('lang') || 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
})

export default i18n
