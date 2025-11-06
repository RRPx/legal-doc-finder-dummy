from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import asyncio, random

app = FastAPI()

# Allow frontend (on port 5173) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data
documents = [
    {
        "title": "Contract Law - Obligations of Parties",
        "summary": "This document outlines the responsibilities and legal obligations of parties entering into binding contracts."
    },
    {
        "title": "Intellectual Property - Patent Ownership",
        "summary": "This document discusses patent ownership rights, infringement issues, and protection mechanisms."
    },
    {
        "title": "Criminal Law - Evidence Admissibility",
        "summary": "This document details the rules for admissibility of evidence in criminal proceedings and the rights of defendants."
    }
]

@app.get("/")
def root():
    return {"message": "running"}

@app.post("/generate")
async def generate(request: Request):
    data = await request.json()
    query = data.get("query", "").strip()
    if not query:
        return {"error": "Query cannot be empty"}
    
    # to mimic processing delay
    await asyncio.sleep(3)

    chosen_doc = random.choice(documents)
    return {
        "query": query,
        "title": chosen_doc["title"],
        "summary": f"Search results for '{query}': {chosen_doc['summary']}"
    }
