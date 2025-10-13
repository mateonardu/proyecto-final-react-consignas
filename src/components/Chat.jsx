import { useState, useEffect } from "react"
import { useChat } from "../context/ChatContext"
import { useNavigate } from "react-router-dom"

export default function Chat() {
  const [msg, setMsg] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const [username, setUsername] = useState("Mateo Narducci")

  const { users, selectedUser, setUsers, theme, setTheme } = useChat()
  const user = users.find(u => u.id === selectedUser)
  const navigate = useNavigate()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const savedName = localStorage.getItem("username")
    if (savedTheme) setTheme(savedTheme)
    if (savedName) setUsername(savedName)
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#1e1e1e" : "#f0f2f5"
    document.body.style.color = theme === "dark" ? "#fff" : "#000"
  }, [theme])
  if (!user) {
    return (
      <div className="user-not-found">
        <p>No hay usuario seleccionado...</p>
      </div>
    )
  }

  const handleChange = (event) => {
    setMsg(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newMessage = {
      id: crypto.randomUUID(),
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }


    const updatedUsers = users.map(u =>
      u.id === user.id
        ? { ...u, messages: [...u.messages, newMessage] }
        : u
    )

    setUsers(updatedUsers)

    setMsg("")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    navigate("/")
  }


  const handleShowPopup = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleClick = () => {
    setShowPopup(true)
  }

  const handleSaveSettings = () => {
    localStorage.setItem("theme", theme)
    localStorage.setItem("username", username)
    setShowPopup(false)
  }

  return (
    <>
      {
        showPopup === true && <section className={`cont-popup ${theme}`}>
          <div className={`popup ${theme}`}>
            <h2>Configuración</h2>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Tema:</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Claro ☀️</option>
              <option value="dark">Oscuro 🌙</option>
            </select>
            <div className="popup-actions">
              <button className="save-btn" onClick={handleSaveSettings}>
                Guardar cambios
              </button>
              <button className="close-btn" onClick={handleClosePopup}>
                Cerrar
              </button>
            </div>
          </div>
        </section>

      }
      <div className={`chat ${theme}`}>
        <header className="chat-header">
          <div>
            <div className="chat-user">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                alt={user.name}
                className="chat-avatar"
              />
              <strong>{user.name}</strong>
              {user.lastSeen !== "" && <span className="last-seen">Last seen: {user.lastSeen}</span>}
            </div>
          </div>

          <div className="chat-actions">
            <button title="Camera">📷</button>
            <button title="Gallery">🖼️</button>
            <button title="Settings" onClick={handleClick}>⚙️</button>
            <button title="Help">❓</button>
            <button tittle="Logout" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </header>

        <section className="chat-messages">
          {user.messages.map((message) => (
            <div className="message" key={message.id}>
              <p>{message.text}</p>
              <span className="time">{message.time}</span>
            </div>
          ))}
        </section>

        <footer className="chat-footer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter text here..."
              onChange={handleChange}
              value={msg}
            />
            <button>➤</button>
          </form>
        </footer>
      </div>
    </>
  )
}
