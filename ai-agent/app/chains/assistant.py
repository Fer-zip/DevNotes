"""
Módulo para los asistentes conversacionales de IA.
Contiene la lógica para el Chat General (FloatingChat) y el Chat de Estudio (Sidebar).
"""

from typing import List, Dict, Any
from google.genai import types
from app.core.llm import get_genai_client

async def generate_general_chat(messages: List[Dict[str, str]], model: str, tone: str) -> str:
    """
    Genera la respuesta para el Asistente General.
    """
    client = get_genai_client()
    
    system_instruction = (
        "Eres el Asistente de Antigravity, un mentor de productividad y estudio omnipresente. "
        "Tu objetivo es ayudar al usuario con su organización, dudas rápidas sobre la plataforma o consejos generales de productividad. "
        f"Tu tono de respuesta DEBE SER estrictamente: {tone.upper()}.\n\n"
        "Reglas:\n"
        "1. Eres un asistente virtual, responde de manera concisa y clara.\n"
        "2. Ayuda con la motivación, la gestión del tiempo y la navegación.\n"
        "3. Si te preguntan sobre un tema específico de estudio, recomiéndales que usen el Asistente de Estudio dentro de un módulo para mayor precisión."
    )
    
    # Preparar el historial de mensajes
    # El formato que espera genai types.Content es role='user' o 'model'
    formatted_messages = []
    for msg in messages:
        role = 'model' if msg.get('role') == 'ai' else 'user'
        formatted_messages.append(
            types.Content(role=role, parts=[types.Part.from_text(text=msg.get('content', ''))])
        )
        
    try:
        response = await client.aio.models.generate_content(
            model=model,
            contents=formatted_messages,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction
            )
        )
        return response.text.strip()
    except Exception as e:
        import traceback
        traceback.print_exc()
        return "Lo siento, tuve un problema al procesar tu solicitud."

