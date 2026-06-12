import sys
import os

# Make sure we can import app
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings
from app.services.ai_agents import groq_client, AIAgents
import json

print(f"--- Configuration Check ---")
key = settings.GROQ_API_KEY
masked_key = f"{key[:4]}...{key[-4:]}" if key and len(key) > 8 else repr(key)
print(f"GROQ_API_KEY loaded: {masked_key}")
print(f"groq_client initialized: {groq_client is not None}")

if groq_client:
    print(f"\n--- Performing Real Groq Request ---")
    print(f"Model configured: llama-3.3-70b-versatile")
    try:
        response = AIAgents.run_gate_1("Test user prompt: Hello, is this working?")
        print(f"Response from Gate 1:")
        print(json.dumps(response, indent=2))
    except Exception as e:
        print(f"Error encountered: {e}")
else:
    print("\nCannot perform real request: groq_client is None.")
