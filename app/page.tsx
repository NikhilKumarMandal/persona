// "use client";

// import { useState } from "react";
// import Image from "next/image";

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAsk = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input || "Give me a cheating trick for math exam" }),
//       });

//       const data = await res.json();
//       setResponse(data.response);
//     } catch (error) {
//       setResponse("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-6 bg-gray-100 dark:bg-black text-black dark:text-white font-sans">
//       <h1 className="text-3xl font-bold">Cheating Page 🤫</h1>

//       <div className="w-full max-w-md flex flex-col items-center gap-4">
//         <input
//           className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//           placeholder="Ask for a trick or use default..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button
//           onClick={handleAsk}
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Thinking..." : "Get Trick 💡"}
//         </button>
//       </div>

//       <div className="max-w-2xl mt-6 bg-white dark:bg-gray-900 p-4 rounded shadow-md text-sm whitespace-pre-line border border-gray-200 dark:border-gray-700">
//         {response || "Your cheating trick will appear here..."}
//       </div>
//     </div>
//   );
// }



"use client"
export default function ChatApp() {


  return (
      <h1></h1>
  )
}
