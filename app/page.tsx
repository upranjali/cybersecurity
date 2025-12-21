"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import UploadBox from "@/components/upload-box";
import TextDetector from "@/components/text-detector";
import ResultsPanel from "@/components/results-panel";
import HowItWorks from "@/components/how-it-works";
import AboutProject from "@/components/about-project";
import Footer from "@/components/footer";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    status: "real" | "ai-generated";
    confidence: number;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<"image" | "text">("image");

  // Handle file upload from UploadBox
  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setResult(null);
  };

  // IMAGE ANALYSIS
  const handleAnalyzeImage = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const res = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      if (!text) throw new Error("Empty server response");

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON:", text);
        throw new Error("Invalid JSON from backend");
      }

      console.log("MODEL OUTPUT:", data);

      const output = data?.result?.[0];
      if (!output) throw new Error("Model returned no prediction");

      const label = output.label?.toLowerCase() || "";
      const score = Math.round((output.score || 0) * 100);

      setResult({
        status: label.includes("fake") || label.includes("ai")
          ? "ai-generated"
          : "real",
        confidence: score,
      });
    } catch (err: any) {
      alert(err.message || "Image analysis failed");
      console.error(err);
    }

    setIsAnalyzing(false);
  };

  // TEXT ANALYSIS
  const handleAnalyzeText = async (text: string) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      console.log("TEXT MODEL RESPONSE:", data);

      const output = data?.output?.[0];

      if (!output) throw new Error("Model returned no prediction");

      const label = output.label?.toLowerCase() || "";
      const score = Math.round((output.score || 0) * 100);

      setResult({
        status: label.includes("ai") ? "ai-generated" : "real",
        confidence: score,
      });
    } catch (err: any) {
      alert("Text analysis failed");
      console.error(err);
    }

    setIsAnalyzing(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <HeroSection />

        {/* TABS */}
        <div className="flex justify-center gap-4 my-12">
          <Button
            onClick={() => {
              setActiveTab("image");
              setResult(null);
            }}
            variant={activeTab === "image" ? "default" : "outline"}
          >
            Image Detector
          </Button>

          <Button
            onClick={() => {
              setActiveTab("text");
              setResult(null);
            }}
            variant={activeTab === "text" ? "default" : "outline"}
          >
            Text Detector
          </Button>
        </div>

        {/* IMAGE TAB */}
        {activeTab === "image" && (
          <>
            <UploadBox
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
            />

            {uploadedImage && (
              <div className="flex justify-center my-8">
                <Button
                  onClick={handleAnalyzeImage}
                  disabled={isAnalyzing}
                  size="lg"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </div>
            )}
          </>
        )}

        {/* TEXT TAB */}
        {activeTab === "text" && (
          <TextDetector
            onTextAnalyze={handleAnalyzeText}
            isAnalyzing={isAnalyzing}
          />
        )}

        {/* RESULTS */}
        {result && (
          <ResultsPanel
            status={result.status}
            confidence={result.confidence}
          />
        )}
      </div>

      <HowItWorks />
      <AboutProject />
      <Footer />
    </main>
  );
}
