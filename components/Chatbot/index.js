import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/auth/authContext";
import ModalChatbot from "./modalChatbot";

const clientQuestions = [
  "Таны төлөвлөгөөний зорилго?",
  "Таны зорилтод хэрэглэгчид?",
  "Таны үйл ажиллагааны чиглэл",
  "Таны боломжит маркетингийн төсөв?",
];

const Chatbot = () => {
  const { authState } = useContext(AuthContext);
  if (!authState?.isLoggedIn) return null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Сайн байна уу? Та Монголын маркетингийн салбарын нэгдсэн системд холбогдлоо. Танд туслахад бэлэн.Та асуулт аа асууна уу?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientStep, setClientStep] = useState(0);
  const [clientAnswers, setClientAnswers] = useState([]);

  const faq = [
    {
      question: "Монголын хамгийн өндөр үзэлттэй телевизийн суваг юу вэ?",
      answer:
        "Монголын хамгийн олон үзэгчтэй суваг бол Боловсрол ТВ бөгөөд Оргил цагаар өдөрт дунджаар 351,549 хэрэглэгч үздэг ба бусад цагаар өдөрт дунджаар 158,658 хэрэглэгч үздэг. Гэхдээ тухайн ТВ-ээр гарч буй Шоу нэвтрүүлэг Кино зэргээс хамааран бусад сувгийн үзэлт илүү өндөр болох тохиолдлууд байдаг",
    },
    {
      question: "Төв талбайн урд байрлах нийслэл дэлгэцийг хэдэн хүн үздэг вэ?",
      answer:
        "Нийслэл дэлгэцийн урдуур өдөрт дунджаар 85,156 автомашин, 38,598 явган зорчигч өнгөрдөг ба тэдний 65 орчим хувь нь буюу 80,674 орчим нь дэлгэцэн дээр тоглогдож буй дүрсийг хардаг. Хэрэв та энэхүү дэлгэцэн дээр сурталчилгаа байршуулахаар төлөвлөж байгаа бол 15 хүртэлх сек-ын урттай видеог өдрийн 420 удаагийн давтамжтай өгөхөд тохиромжтой",
    },
    {
      question: "Чи маркетинг төлөвлөгөө боловсруулж чадах уу?",
      answer:
        "Тиймээ чадна гэхдээ төлөвлөгөө боловсруулахын өмнө таниас хэдэн зүйлсийг тодруулах шаардлагатай. Та хариулахад бэлэн үү?",
    },
    {
      question: clientQuestions[0], // here
      answer: "Баярлалаа таны төлөвлөгөө бэлэн боллоо ",
    },
  ];  
// Call your backend endpoint to get OpenAI response
async function fetchAIResponse(message) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      // Handle HTTP errors like 404, 500 etc.
      console.error("API call failed with status:", response.status);
      return null;
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error("Fetch AI response error:", error);
    return null;
  }
}
  
  const handleSend = async () => {
    if (!input.trim()) return;

    const currentUserMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: currentUserMessage }]);
    setInput(""); // Clear input immediately for better UX

    // If in client question flow
    if (clientStep > 0 && clientStep <= clientQuestions.length) {
      const nextStep = clientStep + 1;
      setClientAnswers([...clientAnswers, currentUserMessage]);

      const aiReply = await fetchAIResponse(currentUserMessage);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: aiReply || "Уучлаарай, таны асуултыг ойлгосонгүй. Дахин оролдоно уу." },
      ]);
      
      return;
    }

    // If bot just asked "Та хариулахад бэлэн үү?" and client says "тийм"
    if (
      messages[messages.length - 1]?.text.includes("Та хариулахад бэлэн үү?") &&
      currentUserMessage.trim().toLowerCase() === "тийм"
    ) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: clientQuestions[0] },
      ]);
      setClientStep(1);
      return; // Prevent fallback message
    }
    
    const aiReply = await fetchAIResponse(currentUserMessage);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: aiReply || "Уучлаарай, таны асуултыг ойлгосонгүй. Дахин оролдоно уу." },
    ]);
  };

  const sendMessage = async (userMessage) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await res.json();
    // Display data.choices[0].message.content in your chat UI
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#2196f3",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 8px #0002",
          fontSize: 28,
          zIndex: 1100,
          cursor: "pointer",
        }}
        aria-label="Chatbot">
        💬
      </button>

      {/* Modal Chatbot Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 30,
            width: 340,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 12,
            boxShadow: "0 4px 24px #0003",
            zIndex: 1200,
            display: "flex",
            flexDirection: "column",
          }}>
          {/* Modal Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#2196f3",
              color: "#fff",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}>
            <span>AllUNeed Чатбот</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
              }}
              aria-label="Close">
              ×
            </button>
          </div>
          {/* Chat Content */}
          <div
            style={{ maxHeight: 300, overflowY: "auto", padding: 10, flex: 1 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  margin: "8px 0",
                }}>
                <span
                  style={{
                    background: msg.from === "user" ? "#e0f7fa" : "#f1f8e9",
                    padding: "6px 12px",
                    borderRadius: 16,
                    display: "inline-block",
                  }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{ flex: 1, border: "none", padding: 8, outline: "none" }}
              placeholder="Бичих..."
            />
            <button
              onClick={handleSend}
              style={{
                padding: "0 16px",
                border: "none",
                background: "#2196f3",
                color: "#fff",
                borderRadius: "0 0 12px 0",
              }}>
              Илгээх
            </button>
          </div>
        </div>
      )}
      <ModalChatbot open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Chatbot;
