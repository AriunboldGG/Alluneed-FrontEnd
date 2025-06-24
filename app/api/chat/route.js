import { NextResponse } from "next/server";

// Default Q&A list (moved from the old proxy file)
const clientQuestions = [
  "Таны төлөвлөгөөний зорилго?",
  "Таны зорилтод хэрэглэгчид?",
  "Таны үйл ажиллагааны чиглэл",
  "Таны боломжит маркетингийн төсөв?",
];

const defaultQA = [
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
    question: clientQuestions[0],
    answer: "Баярлалаа таны төлөвлөгөө бэлэн боллоо ",
  },
];

export async function POST(req) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    console.log('DEBUG: OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'exists' : 'MISSING');
    console.log('DEBUG: About to call OpenAI with message:', message);

    // 1. Check for a default answer
    const found = defaultQA.find(
      (qa) => qa.question.trim().toLowerCase() === message.trim().toLowerCase()
    );
    if (found) {
      return NextResponse.json({ reply: found.answer });
    }

    // 2. If no default answer, call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    console.log('DEBUG: OpenAI response status:', response.status);
    console.log('DEBUG: OpenAI response body:', data);

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return NextResponse.json({ reply: data.choices[0].message.content });
    } else {
      // Handle cases where OpenAI returns an error or no choice
      const errorMessage = data.error ? data.error.message : "No response from OpenAI";
      return NextResponse.json({ reply: null, error: errorMessage }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ reply: null, error: err.message }, { status: 500 });
  }
} 