from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

import os

load_dotenv()

app = FastAPI(
    title="StyleAI API",
    version="3.0.0"
)

os.makedirs("images", exist_ok=True)

app.mount(
    "/images",
    StaticFiles(directory="images"),
    name="images"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)



class OutfitRequest(BaseModel):
    occasion: str
    gender: str
    weather: str
    style: str
    dressCode: str
    color: str



@app.get("/")
def home():
    return {
        "status": "success",
        "project": "StyleAI",
        "version": "3.0.0",
        "message": "Welcome to StyleAI 🚀"
    }


@app.post("/generate-outfit")
def generate_outfit(data: OutfitRequest):

    prompt = f"""
You are StyleAI, an elite celebrity fashion stylist.

Generate ONE premium outfit recommendation.

User Details:
Occasion: {data.occasion}
Gender: {data.gender}
Weather: {data.weather}
Style: {data.style}
Dress Code: {data.dressCode}
Favorite Color: {data.color}

RULES:
- Keep Top, Bottom, Shoes and Accessories under 8 words.
- Never explain clothing items.
- Do not use bullet points.
- Use practical, stylish fashion.
- Style Score must look like: 96/100
- Why must be only two short sentences (under 25 words).

Return EXACTLY in this format:

Top: White linen shirt
Bottom: Black tailored trousers
Shoes: White leather sneakers
Accessories: Silver watch
Style Score: 96/100
Why: Elegant for the occasion while remaining comfortable. The colors complement each other perfectly.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.replace("**", "").strip()

    outfit = {
        "top": "",
        "bottom": "",
        "shoes": "",
        "accessories": "",
        "style_score": "",
        "reason": ""
    }

    for line in text.splitlines():

        line = line.strip()

        if line.startswith("Top:"):
            outfit["top"] = line.replace("Top:", "").strip()

        elif line.startswith("Bottom:"):
            outfit["bottom"] = line.replace("Bottom:", "").strip()

        elif line.startswith("Shoes:"):
            outfit["shoes"] = line.replace("Shoes:", "").strip()

        elif line.startswith("Accessories:"):
            outfit["accessories"] = line.replace("Accessories:", "").strip()

        elif line.startswith("Style Score:"):
            outfit["style_score"] = line.replace("Style Score:", "").strip()

        elif line.startswith("Why:"):
            outfit["reason"] = line.replace("Why:", "").strip()

    return outfit


@app.get("/hello")
def hello():



    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say hello to StyleAI in one sentence."
    )

    return {
        "response": response.text
    }