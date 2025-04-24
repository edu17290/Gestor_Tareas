# Documentación de la API

## Índice

1. [Autenticación](#autenticación)
2. [Usuarios](#usuarios)
    1. [Crear Usuario](#crear-usuario)
    2. [Obtener Usuarios](#obtener-usuarios)
    3. [Actualizar Usuario](#actualizar-usuario)
    4. [Obtener Datos del Usuario Actual](#obtener-datos-del-usuario-actual)
    5. [Iniciar Sesión](#iniciar-sesión)
3. [Tareas](#tareas)
    1. [Crear Tarea](#crear-tarea)
    2. [Obtener Tareas](#obtener-tareas)
    3. [Obtener Tarea por ID](#obtener-tarea-por-id)
    4. [Actualizar Tarea](#actualizar-tarea)
    5. [Eliminar Tarea](#eliminar-tarea)

---

## Autenticación

### Iniciar sesión

- **Método**: `POST`
- **Ruta**: `/users/login`
- **Descripción**: Inicia sesión y devuelve un token de acceso.
- **Parámetros**:
    - `username` (string): Nombre de usuario.
    - `password` (string): Contraseña del usuario.
- **Respuesta exitosa**:
    ```json
    {
      "access_token": "string",
      "token_type": "bearer"
    }
    ```
- **Errores**:
    - `401 Unauthorized`: Si las credenciales son incorrectas.

---

## Usuarios

### Crear Usuario

- **Método**: `POST`
- **Ruta**: `/users/`
- **Descripción**: Crea un nuevo usuario en el sistema.
- **Cuerpo**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Respuesta exitosa**:
    ```json
    {
      "id": 1,
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Errores**:
    - `400 Bad Request`: Si el email o nombre de usuario ya existen.

### Obtener Usuarios (Paginado)

- **Método**: `GET`
- **Ruta**: `/users`
- **Descripción**: Obtiene los usuarios con paginación.
- **Parámetros**:
    - `page` (int): Página de la paginación (por defecto 1).
    - `page_size` (int): Número de usuarios por página (por defecto 10).
- **Respuesta exitosa**:
    ```json
    {
      "total": 100,
      "page": 1,
      "page_size": 10,
      "total_pages": 10,
      "users": [
        {
          "id": 1,
          "username": "string",
          "email": "string"
        },
        ...
      ]
    }
    ```

### Obtener Datos del Usuario Actual

- **Método**: `GET`
- **Ruta**: `/users/me`
- **Descripción**: Obtiene los datos del usuario autenticado.
- **Respuesta exitosa**:
    ```json
    {
      "id": 1,
      "username": "string",
      "email": "string"
    }
    ```

### Actualizar Usuario

- **Método**: `PUT`
- **Ruta**: `/users/me`
- **Descripción**: Actualiza los datos del usuario autenticado.
- **Cuerpo**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Respuesta exitosa**:
    ```json
    {
      "id": 1,
      "username": "string",
      "email": "string"
    }
    ```

---

## Tareas

### Crear Tarea

- **Método**: `POST`
- **Ruta**: `/tasks/`
- **Descripción**: Crea una nueva tarea para el usuario autenticado.
- **Cuerpo**:
    ```json
    {
      "title": "string",
      "description": "string",
      "due_date": "YYYY-MM-DD",
      "status": "string"
    }
    ```
- **Respuesta exitosa**:
    ```json
    {
      "id": 1,
      "title": "string",
      "description": "string",
      "due_date": "YYYY-MM-DD",
      "status": "string",
      "user_id": 1
    }
    ```

### Obtener Tareas

- **Método**: `GET`
- **Ruta**: `/tasks/`
- **Descripción**: Obtiene todas las tareas del usuario autenticado.
- **Respuesta exitosa**:
    ```json
    [
      {
        "id": 1,
        "title": "string",
        "description": "string",
        "due_date": "YYYY-MM-DD",
        "status": "string",
        "user_id": 1
      },
      ...
    ]
    ```

### Obtener Tarea por ID

- **Método**: `GET`
- **Ruta**: `/tasks/{task_id}`
- **Descripción**: Obtiene una tarea específica del usuario autenticado.
- **Parámetros**:
    - `task_id` (int): ID de la tarea.
- **Respuesta exitosa**:
    ```json
    {
      "id": 1,
      "title": "string",
      "description": "string",
      "due_date": "YYYY-MM-DD",
      "status": "string",
      "user_id": 1
    }
    ```
- **Errores**:
    - `404 Not Found`: Si la tarea no existe o no está asociada al usuario autenticado.

### Actualizar Tarea

- **Método**: `PUT`
- **Ruta**: `/tasks/{task_id}`
- **Descripción**: Actualiza una tarea específica del usuario autenticado.
- **Parámetros**:
    - `task_id` (int): ID de la tarea.
- **Cuerpo**:
    ```json
    {
      "title": "string",
      "description": "string",
      "due_date": "YYYY-MM-DD",
      "status": "string"
    }
    ```
- **Respuesta exitosa**:
    ```json
    {
      "id": 1,
      "title": "string",
      "description": "string",
      "due_date": "YYYY-MM-DD",
      "status": "string",
      "user_id": 1
    }
    ```

### Eliminar Tarea

- **Método**: `DELETE`
- **Ruta**: `/tasks/{task_id}`
- **Descripción**: Elimina una tarea específica del usuario autenticado.
- **Parámetros**:
    - `task_id` (int): ID de la tarea.
- **Respuesta exitosa**:
    - `204 No Content`: La tarea fue eliminada correctamente.
- **Errores**:
    - `404 Not Found`: Si la tarea no existe o no está asociada al usuario autenticado.

---

## Notas Adicionales

- **Formato de fecha**: Las fechas deben enviarse en formato `YYYY-MM-DD`.
- **Autenticación**: Todas las rutas de tareas requieren un token de acceso válido, que debe incluirse en los encabezados de las solicitudes con el esquema `Bearer`.
  
---
