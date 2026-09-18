#!/usr/bin/env python3
"""
AI Agent for Document Grounding, Ollama (Llama 3) Interaction, and Vector Search.
Works alongside the Java Vector Service and Frontend UI.
"""

import os
import sys
import json
import urllib.request
import urllib.error

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "ServiceConfig.json")

def load_config():
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "ollama": {
            "baseUrl": "http://localhost:11434",
            "generationModel": "llama3:8b",
            "embeddingModel": "nomic-embed-text"
        },
        "port": 8086
    }

CONFIG = load_config()
OLLAMA_URL = os.environ.get("OLLAMA_BASE_URL", CONFIG["ollama"]["baseUrl"])
GEN_MODEL = CONFIG["ollama"]["generationModel"]
EMBED_MODEL = CONFIG["ollama"]["embeddingModel"]

def get_embedding(text: str):
    """Generate vector embedding from Ollama."""
    url = f"{OLLAMA_URL}/api/embeddings"
    payload = json.dumps({
        "model": EMBED_MODEL,
        "prompt": text
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            data = json.loads(res.read().decode("utf-8"))
            return data.get("embedding", [])
    except Exception as e:
        print(f"[Agent] Embedding generation error: {e}", file=sys.stderr)
        return []

def ask_llama3(prompt: str, context: str = ""):
    """Send question to Llama 3 with grounded document context."""
    system_instruction = (
        "You are DocLens AI assistant. Answer accurately based on the provided document context. "
        "Do not use asterisks or star symbols (*) in your answer. Use plain text formatting."
    )
    full_prompt = prompt
    if context:
        full_prompt = f"=== CONTEXT ===\n{context}\n\n=== QUESTION ===\n{prompt}"

    url = f"{OLLAMA_URL}/api/generate"
    payload = json.dumps({
        "model": GEN_MODEL,
        "prompt": full_prompt,
        "system": system_instruction,
        "stream": False,
        "options": {
            "temperature": 0.2
        }
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as res:
            data = json.loads(res.read().decode("utf-8"))
            response_text = data.get("response", "")
            # Clean stars
            return response_text.replace("*", "")
    except Exception as e:
        return f"[Agent Error]: Failed to connect to Ollama ({e}). Is Ollama running on {OLLAMA_URL}?"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        print(f"Querying {GEN_MODEL}...")
        answer = ask_llama3(query)
        print(answer)
    else:
        print("DocLens AI Agent Ready. Usage: python ai_agent.py '<your question>'")
