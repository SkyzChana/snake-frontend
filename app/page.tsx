// "use client";
// import { useState } from "react";
// import { Button, Card, CardBody, Input } from "@nextui-org/react";

// export default function Home() {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("https://YOUR_BACKEND_API_URL/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       console.error(err);
//       alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
//       <Card className="max-w-md w-full p-4 shadow-lg">
//         <CardBody className="flex flex-col items-center gap-4">
//           <h1 className="text-2xl font-bold">ตรวจสอบชนิดงู</h1>
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//           />
//           <Button color="primary" onPress={handleUpload} isLoading={loading}>
//             อัปโหลด
//           </Button>

//           {result && (
//             <div className="mt-4 text-center">
//               <h2 className="font-semibold text-lg">
//                 {result.species} ({(result.confidence * 100).toFixed(2)}%)
//               </h2>
//               <img
//                 src={URL.createObjectURL(file!)}
//                 alt="Uploaded Snake"
//                 className="mt-3 rounded-xl shadow"
//               />
//             </div>
//           )}
//         </CardBody>
//       </Card>
//     </main>
//   );
// }
"use client";
import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://10.10.11.95:8080/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-green-50 to-green-100">
      <Card className="max-w-md w-full p-6 shadow-2xl rounded-2xl border border-green-200">
        <CardBody className="flex flex-col items-center gap-5">
          <h1 className="text-3xl font-bold text-green-900">ตรวจสอบชนิดงู 🐍</h1>
          
          <label className="w-full">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <div className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-xl text-center cursor-pointer hover:border-green-500 transition-colors">
              {file ? file.name : "คลิกเพื่อเลือกไฟล์รูปงู"}
            </div>
          </label>

          <Button
            color="success"
            onPress={handleUpload}
            isLoading={loading}
            className="w-full"
          >
            อัปโหลด
          </Button>

          {result && (
            <div className="mt-6 w-full text-center">
              <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md animate-fade-in">
                <h2 className="font-semibold text-xl text-green-900">
                  {result.species} ({(result.confidence * 100).toFixed(2)}%)
                </h2>
                <img
                  src={URL.createObjectURL(file!)}
                  alt="Uploaded Snake"
                  className="mt-4 rounded-2xl shadow-lg border border-green-100"
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </main>
  );
}
