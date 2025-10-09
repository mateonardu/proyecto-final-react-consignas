import { createContext, useContext, useState, useEffect } from "react"

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
  // 1. Estado de usuarios
  // Inicializamos vacío; luego lo cargamos de localStorage o mock
  const [users, setUsers] = useState([])

  // 2. Estado del usuario seleccionado
  const [selectedUser, setSelectedUser] = useState(null)

  // 3. Al montar el Provider, revisamos si hay usuarios guardados en localStorage
  //    - Si existen, los usamos
  //    - Si no existen, cargamos los mock iniciales
  useEffect(() => {
    const storedUsers = localStorage.getItem("users")

    if (storedUsers !== null) {
      setUsers(JSON.parse(storedUsers))
    } else {
      const initialUsers = [
        {
          id: 1,
          name: "Mateo Narducci",
          status: "online",
          lastSeen: "",
          messages: [
            { id: 1, text: "Hola, como estas?", time: "00:40" }
          ]
        },
        {
          id: 2,
          name: "Cristiano Ronaldo",
          status: "offline",
          lastSeen: "3 hours ago",
          messages: [
            { id: 1, text: "Cristiano", time: "11:30" },
            { id: 2, text: "Contesta dale", time: "13:54" },
            { id: 3, text: "Cristianooooooooooooo", time: "22:30" }
          ]
        },
        {
          id: 3,
          name: "Riquelme",
          status: "online",
          lastSeen: "",
          messages: [
            { id: 1, text: "Hola roman", time: "13:00" },
            { id: 2, text: "*ruido de mate*", time: "13:01" }
          ]
        },
        {
          id: 4,
          name: "Leo Messi",
          status: "offline",
          lastSeen: "1 minute ago",
          messages: [
            { id: 1, text: "Te amo lio", time: "18:59" }
          ]
        }
      ]
      setUsers(initialUsers)
      // Actualizamos la lista de usuarios en el localstorage
      localStorage.setItem("users", JSON.stringify(initialUsers))
    }
  }, [])

  // 4. Cada vez que `users` cambie, sincronizamos con localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users))
    }
  }, [users])

  return (
    <ChatContext.Provider value={{ users, setUsers, selectedUser, setSelectedUser }}>
      {children}
    </ChatContext.Provider>
  )
}

const useChat = () => useContext(ChatContext)

export { useChat, ChatProvider }
