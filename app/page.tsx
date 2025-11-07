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
      const res = await fetch("https://YOUR_BACKEND_API_URL/upload", {
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
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <Card className="max-w-md w-full p-4 shadow-lg">
        <CardBody className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">ตรวจสอบชนิดงู</h1>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button color="primary" onPress={handleUpload} isLoading={loading}>
            อัปโหลด
          </Button>

          {result && (
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-lg">
                {result.species} ({(result.confidence * 100).toFixed(2)}%)
              </h2>
              <img
                src={URL.createObjectURL(file!)}
                alt="Uploaded Snake"
                className="mt-3 rounded-xl shadow"
              />
            </div>
          )}
        </CardBody>
      </Card>
    </main>
  );
}
