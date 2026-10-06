"""
Módulo del núcleo para la inicialización y configuración del cliente de Google GenAI.
"""

import os
import json
import re
from google import genai
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def get_genai_client() -> genai.Client:
    """
    Inicializa y retorna una instancia configurada del cliente oficial de Google GenAI.
    
    Returns:
        genai.Client: El cliente de GenAI autenticado y listo para operar.
    
    Raises:
        ValueError: Si la variable de entorno GEMINI_API_KEY no está configurada.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("La variable de entorno GEMINI_API_KEY no está configurada.")
    
    return genai.Client(api_key=api_key)

def parse_json_from_llm(text: str):
    """
    Extrae y parsea robustamente código JSON desde una respuesta del LLM,
    incluso si viene envuelto en bloques markdown o etiquetas HTML residuales.
    """
    clean_text = text.strip()
    
    # Remover etiquetas markdown al inicio (ej. ```json)
    clean_text = re.sub(r"^```(?:json)?\n?", "", clean_text, flags=re.IGNORECASE).strip()
    # Remover etiquetas markdown al final
    clean_text = re.sub(r"```$", "", clean_text).strip()
    # Remover posibles etiquetas de código de cierre (ej. </code>) que la IA haya agregado por error
    clean_text = re.sub(r"</?[a-zA-Z0-9]+>\s*$", "", clean_text, flags=re.IGNORECASE).strip()
    
    try:
        return json.loads(clean_text)
    except json.JSONDecodeError as e:
        if e.msg.startswith("Extra data"):
            # Si hay datos extra (ej. una llave } adicional al final), cortar ahí
            truncated = clean_text[:e.pos].strip()
            try:
                return json.loads(truncated)
            except json.JSONDecodeError:
                pass
        
        # Fallback: intentar extraer el primer objeto o array completo usando expresiones regulares básicas o heurísticas
        start_obj = clean_text.find('{')
        start_arr = clean_text.find('[')
        
        start_idx = start_obj if (start_obj != -1 and (start_arr == -1 or start_obj < start_arr)) else start_arr
        
        if start_idx != -1:
            # Iterar desde el final para encontrar la última llave/corchete válida
            for i in range(len(clean_text) - 1, start_idx, -1):
                if clean_text[i] in ('}', ']'):
                    try:
                        return json.loads(clean_text[start_idx:i+1])
                    except json.JSONDecodeError:
                        continue
        
        raise
