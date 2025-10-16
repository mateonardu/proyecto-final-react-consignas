import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { ChatProvider } from "../context/ChatContext";
import { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";

const MessagesContent = () => {
  const { selectedUser } = useChat();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      {isMobile ? (
        <>
          <button
            className="menu-toggle-fixed"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú lateral"
          >
            ☰
          </button>

          {menuOpen && (
            <div
              className="overlay"
              onClick={() => setMenuOpen(false)}
            ></div>
          )}
          <Sidebar isOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Chat setMenuOpen={setMenuOpen} />
        </>
      ) : (
        <>
          <Sidebar />
          <Chat />
        </>
      )}
    </div>
  );
};

const Messages = () => {
  return (
    <ChatProvider>
      <MessagesContent />
    </ChatProvider>
  );
};

export { Messages };
