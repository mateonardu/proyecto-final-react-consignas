import { useChat } from "../context/ChatContext"

export default function Help() {
  const { theme } = useChat()
  return (
    <main className={`help-page ${theme}`}>
      <h1>📘 Ayuda y Documentación</h1>

      <section>
        <h2>🧠 Funcionamiento general del chat</h2>
        <p>
          Esta aplicación simula el entorno de mensajería de WhatsApp.
          Permite seleccionar contactos, visualizar conversaciones previas
          y enviar nuevos mensajes que se almacenan localmente en tu navegador
          mediante <strong>localStorage</strong>, por lo que no se pierden al recargar la página.
        </p>
      </section>

      <section className="tecnologias">
        <h2>⚙️ Tecnologías utilizadas</h2>
        <ul>
          <li>⚛️ <strong>React</strong>: estructura principal de componentes.</li>
          <li>🧭 <strong>React Router DOM</strong>: navegación entre páginas (Login, Chat, Help).</li>
          <li>💾 <strong>localStorage</strong>: persistencia de usuarios y mensajes.</li>
          <li>🎨 <strong>CSS modular</strong>: estilos personalizados, modo claro/oscuro.</li>
        </ul>
      </section>

      <section className="mejoras">
        <h2>🚀 Posibles mejoras futuras</h2>
        <ul>
          <li>Agregar conexión en tiempo real con <strong>WebSockets</strong>.</li>
          <li>Implementar autenticación con usuarios reales.</li>
          <li>Permitir envío de imágenes, audios y emojis.</li>
          <li>Diseñar una versión responsive para móviles.</li>
        </ul>
      </section>

      <p className="credits">
        Proyecto creado por <strong>Mateo Narducci</strong> — React JS 2025 💬
      </p>
    </main>
  )
}
