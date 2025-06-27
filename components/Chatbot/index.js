import React, { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "@/context/auth/authContext";
import ModalChatbot from "./modalChatbot";
import { Spinner, Tooltip, Avatar, Input, Button } from "@nextui-org/react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

const clientQuestions = [
  "Таны төлөвлөгөөний зорилго?",
  "Таны зорилтод хэрэглэгчид?",
  "Таны үйл ажиллагааны чиглэл",
  "Таны боломжит маркетингийн төсөв?",
];

const Chatbot = () => {
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
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

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
        console.error("API call failed with status:", response.status);
        return null;
      }
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Fetch AI response error:", error);
      return null;
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const currentUserMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: currentUserMessage }]);
    setInput("");
    setLoading(true);
    
    // If in client question flow
    if (clientStep > 0 && clientStep <= clientQuestions.length) {
      setClientAnswers([...clientAnswers, currentUserMessage]);
      
      // Check if this is the last question (budget question)
      if (clientStep === clientQuestions.length) {
        // This is the last question, show modal after a brief delay
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Баярлалаа! Таны бүх хариултыг хүлээн авлаа. Төлөвлөгөөг бэлтгэж байна..." },
        ]);
        setLoading(false);
        
        // Open modal after a short delay
        setTimeout(() => {
          setIsModalOpen(true);
          // Reset the flow
          setClientStep(0);
          setClientAnswers([]);
        }, 2000);
        return;
      }
      
      // Not the last question, ask the next one
      const nextQuestion = clientQuestions[clientStep];
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: nextQuestion },
      ]);
      setClientStep(clientStep + 1);
      setLoading(false);
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
      setLoading(false);
      return;
    }
    
    const aiReply = await fetchAIResponse(currentUserMessage);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: aiReply || "Уучлаарай, таны асуултыг ойлгосонгүй. Дахин оролдоно уу." },
    ]);
    setLoading(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <Tooltip content="Chat with us!" placement="left">
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg flex items-center justify-center text-3xl z-50 hover:scale-110 transition-transform"
          aria-label="Open chatbot"
        >
          <FaRobot />
        </button>
      </Tooltip>

      {/* Modal Chatbot Window */}
      {open && (
        <div className="fixed bottom-28 right-8 w-[350px] max-w-[95vw] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col animate-fadeIn">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Avatar icon={<FaRobot />} size="sm" className="bg-white text-blue-600" />
              <span className="text-white font-bold text-lg">AllUNeed Чатбот</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-2xl font-bold hover:text-gray-200 transition-colors"
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50" style={{ maxHeight: 400 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex mb-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl px-4 py-2 max-w-[80%] text-sm shadow-sm whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-white text-gray-800 border border-gray-200 self-start"
                  } animate-fadeIn`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-2">
                <div className="rounded-xl px-4 py-2 bg-white border border-gray-200 text-gray-800 flex items-center gap-2 animate-pulse">
                  <Spinner size="sm" color="primary" />
                  <span>Бот бичиж байна...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 border-t border-gray-200 px-4 py-3 bg-white rounded-b-2xl"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            aria-label="Chat input area"
          >
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Таны асуултыг бичнэ үү..."
              className="flex-1"
              aria-label="Type your message"
              disabled={loading}
              autoFocus
            />
            <Button
              isIconOnly
              color="primary"
              variant="shadow"
              type="submit"
              aria-label="Send message"
              disabled={loading || !input.trim()}
            >
              <FaPaperPlane />
            </Button>
          </form>
        </div>
      )}
      <ModalChatbot open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Chatbot;
