# Cybersecurity Threat Detection System  
AI-Powered Fake Content Detection Platform

## Project Summary

This project is a full-stack cybersecurity application that detects **fake, manipulated, or malicious content** in both **text and images** using **fine-tuned multimodal machine learning models**. The system integrates a modern web interface with a scalable backend and a transformer-based ML inference pipeline.

The project demonstrates hands-on experience with **vision-language models, fine-tuning workflows, API-based inference, and secure system design**, making it well-aligned with **machine learning, cybersecurity, and software engineering internship roles**.

---

## Why This Project Matters 

- Demonstrates applied ML beyond basic model usage  
- Shows understanding of Vision Transformers and multimodal learning  
- End-to-end ownership: frontend, backend, and ML inference  
- Secure handling of secrets and inference APIs  
- Designed with production-oriented architecture  

---

## Core Features

- AI-based fake content detection for text  
- Image authenticity analysis using a fine-tuned vision-language model  
- RESTful backend APIs for ML inference  
- Secure API key management using environment variables  
- Modular and scalable system architecture  

---

## Machine Learning Approach

### Model Used
- **Fine-tuned PaliGemma-2**
- Framework: **Keras**
- Paradigm: **Vision-Language Transformer**

### How Image Analysis Works 

The image detection pipeline is based on **Vision Transformer (ViT) principles**, which differ fundamentally from traditional CNN-based image models.

1. **Image Patchification**
   - Each input image is divided into **fixed-size square patches** (e.g., 16×16 pixels).
   - These patches act as “visual tokens,” similar to words in NLP.

2. **Patch Embedding**
   - Each image patch is flattened and projected into a high-dimensional embedding space.
   - Positional embeddings are added to preserve spatial information.

3. **Transformer Encoding**
   - The sequence of patch embeddings is passed through transformer layers.
   - Self-attention allows the model to learn **global relationships** across the entire image, not just local features.

4. **Multimodal Fusion (PaliGemma-2)**
   - Visual embeddings are aligned with language representations.
   - This allows the model to reason about **semantic inconsistencies**, manipulation artifacts, and contextual anomalies.

5. **Fine-Tuning**
   - The base PaliGemma-2 model is fine-tuned on task-specific data.
   - Fine-tuning adapts the model to detect fake or manipulated visual content more accurately.

### Why and understanding how it works

- Patch-based transformers detect **subtle manipulations** often missed by CNNs  
- Global attention helps identify inconsistencies across the entire image  
- Multimodal reasoning improves robustness against adversarial content  

---

## Text Analysis Model

- Transformer-based language model
- Analyzes linguistic patterns, coherence, and semantic anomalies
- Detects misinformation signals rather than keyword matching

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js runtime
- Secure API abstraction layer

### Machine Learning
- Fine-tuned **PaliGemma-2** (Vision-Language Transformer)
- Keras-based training and inference
- Hugging Face inference integration

---

## System Architecture

```
User Interface (Next.js)
        ↓
API Layer (Next.js API Routes)
        ↓
ML Inference Layer
(Fine-Tuned PaliGemma-2)
        ↓
Prediction & Confidence Scores
        ↓
Result Visualization
```

---

## Project Structure

```
cybersecurity-project/
│
├── app/
│   ├── api/
│   │   ├── analyze-text/
│   │   │   └── route.ts
│   │   ├── analyze-image/
│   │   │   └── route.ts
│   └── page.tsx
│
├── components/
├── public/
├── styles/
├── .env.local
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env.local` file in the root directory:

```
HUGGINGFACE_API_KEY=your_api_key_here
HF_IMAGE_MODEL=custom-finetuned-paligemma2
HF_TEXT_MODEL=text-analysis-transformer
```

Sensitive credentials are excluded from version control.

---

## Installation & Local Setup

1. Clone the repository
```
git clone https://github.com/your-username/your-repo-name.git
```

2. Install dependencies
```
npm install
```

3. Configure environment variables

4. Start the development server
```
npm run dev
```

5. Open in browser
```
http://localhost:3000
```

---

## API Endpoints

### Text Analysis
```
POST /api/analyze-text
```
- Input: Plain text
- Output: Authenticity and semantic risk assessment

### Image Analysis
```
POST /api/analyze-image
```
- Input: Image file
- Output: Fake/real classification with confidence

---

## Security & Engineering Practices

- Secure environment-based secret handling  
- Stateless backend design  
- Modular inference APIs  
- ML abstraction for easy model upgrades  

---

## Repository Scope

This repository contains the **full frontend**, **backend API logic**, and **ML inference integration**.  
Model inference is accessed via secure APIs, mirroring real-world industry deployments.

---

## Potential Enhancements

- Dataset expansion and re-training pipeline  
- Adversarial robustness testing  
- Database-backed audit logs  
- Authentication and RBAC  
- Model explainability (attention visualization)  

---

## Use Cases

- Fake image and misinformation detection  
- Social media content moderation  
- Cybersecurity awareness tools  
- Academic ML research demonstrations  
- AI-powered verification systems  

---

## Author

Pranjali Upadhyay  
B.Tech, Electronics & Communication Engineering  
Interests: Cybersecurity, Applied Machine Learning, Vision-Language Models  

---

## License

This project is intended for educational and demonstration purposes and is open for extension.
