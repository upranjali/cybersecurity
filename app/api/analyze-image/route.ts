import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = body?.text;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const HF_KEY = process.env.HUGGINGFACE_API_KEY;
    const MODEL = process.env.HF_TEXT_MODEL;

    if (!HF_KEY || !MODEL) {
      return NextResponse.json({ error: "Missing HF env" }, { status: 500 });
    }

    // NEW HuggingFace Router endpoint (the correct one)
    const response = await fetch(
      `https://router.huggingface.co/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
        }),
      }
    );

    const raw = await response.text();
    console.log("TEXT RAW RESPONSE:", raw);

    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid JSON from HF", raw }, { status: 500 });
    }

    return NextResponse.json({ result });
  } catch (err) {
    console.log("SERVER TEXT ERROR :", err);
    return NextResponse.json({ error: "Server crashed" }, { status: 500 });
  }
}
