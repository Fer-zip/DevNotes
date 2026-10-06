"""
Módulo de configuración para centralizar los nombres de los modelos de Gemini 3.
Evita el hardcoding en la lógica de negocio y permite cambiar de modelo de forma global.
"""

# Modelo para tareas de razonamiento y diseño curricular (mapeado a Flash para ahorrar costes)
MODEL_PRO = "gemini-3-flash-preview"

# Modelo estándar veloz e inteligente
MODEL_FLASH = "gemini-3-flash-preview"

# Modelo liviano optimizado para tareas de gran volumen y bajo costo (análisis de documentos, chats preliminares)
MODEL_LITE = "gemini-3.1-flash-lite"

# Modelo especializado en generación y comprensión visual de alta eficiencia
MODEL_IMAGE = "gemini-3.1-flash-image-preview"