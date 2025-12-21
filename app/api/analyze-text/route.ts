import { NextRequest, NextResponse } from "next/server"

const HF_MODEL = process.env.HF_TEXT_MODEL || "microsoft/phi-2"
const HF_KEY = process.env.HUGGINGFACE_API_KEY

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    const res = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    })

    const result = await res.json()
    const { status, confidence } = normalize(result)

    return NextResponse.json({ status, confidence })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function normalize(results: any) {
  let best = results[0]
  for (const r of results) if (r.score > best.score) best = r

  const label = best.label.toLowerCase()
  const status = label.includes("ai") ? "ai-generated" : "real"
  const confidence = Math.round(best.score * 100)

  return { status, confidence }
}
