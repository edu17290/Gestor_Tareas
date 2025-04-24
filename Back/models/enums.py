import enum

class PriorityEnum(str, enum.Enum):
    """Enum para definir las prioridades de las tareas"""
    alta = "alta"
    media = "media"
    baja = "baja"