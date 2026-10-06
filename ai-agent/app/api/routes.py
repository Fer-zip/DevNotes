"""
Definición de las rutas y controladores del servidor FastAPI para el microservicio de IA.
"""

from fastapi import APIRouter, HTTPException

from app.chains.assistant import generate_general_chat

router = APIRouter()

from app.core.models import MODEL_FLASH


@router.post("/chat/general")
async def chat_general_endpoint(data: dict):
    """
    Endpoint para el Asistente General (FloatingChat).
    """
    messages = data.get("messages", [])
    model = data.get("model", MODEL_FLASH)
    tone = data.get("tone", "profesional")
    
    if not messages:
        raise HTTPException(status_code=400, detail="Se requiere historial de mensajes.")
        
    response = await generate_general_chat(messages, model, tone)
    return {"response": response}

