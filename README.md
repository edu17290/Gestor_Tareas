# FastAPI Task Manager

## Descripción

Este es un backend para una aplicación de gestión de tareas, desarrollado con [FastAPI](https://fastapi.tiangolo.com/). La aplicación permite a los usuarios autenticarse, crear, leer, actualizar y eliminar tareas, todo mediante una API RESTful.

## Requisitos

La aplicación está construida con [FastAPI](https://fastapi.tiangolo.com/) y otras dependencias incluidas en el archivo `requirements.txt`.

## Instalación

Para instalar las dependencias y ejecutar la aplicación, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone git@github.com:edu17290/Gestor_Tareas.git
   cd Gestor_Tareas
   ```

2. Crea un entorno virutal:
   ```bash
   python -m venv venv
   ```

3. Activa el entorno virutal:
    * En Windows:
      ```bash
      venv\Scripts\activate
      ```

    * En Linux:
      ```bash
        source venv/bin/activate
      ```

4. Instala las dependencias:
   ```bash
    pip install -r requirements.txt
   ```

## Ejecución
Para ejecutar la aplicación localmente, utiliza el siguiente comando:
```bash
  uvicorn main:app --reload
```
## Documentación de la API
FastAPI genera automáticamente la documentación de la API utilizando Swagger. Puedes acceder a ella en:

- [Swagger UI](http://127.0.0.1:8000/docs)


## Rutas de la API
Las rutas principales de la API incluyen:

- Usuarios:
  * Crear usuario.
  * Obtener usuarios.
  * Actualizar usuario.
  * Iniciar sesión.

- Tareas:
  * Crear tarea.
  * Obtener tareas.
  * Obtener tarea por ID.
  * Actualizar tarea.
  * Eliminar tarea.

## Autenticación
La aplicación utiliza JWT (JSON Web Tokens) para autenticar a los usuarios. Al iniciar sesión, recibirás un token que debes incluir en el encabezado Authorization de las solicitudes protegidas. El token debe tener el siguiente formato:
```bash
  Authorization: Bearer <tu_token_aqui>
```
