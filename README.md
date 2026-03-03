# Chat

[Deploy](https://prueba-92c10.web.app/)

Aplicacion de mensajeria en tiempo real entre usuarios, construida con React y Firebase.

## Tech Stack

- TypeScript + Vite
- React + React Router (Declarativo)
- Firebase + [ReactFire](https://github.com/FirebaseExtended/reactfire)
- Zod + React-hook-form

## Servicios de Firebase

- Authentication
- Firestore Database
- Hosting

## Features

- Un usuario puede buscar a otro mediante su email.
- Un usuario puede enviar mensajes a otro.
- Un usuario puede cambiar su nombre.

---

```
└── 📁src
    └── 📁components
        └── 📁ui
            ├── avatar.tsx
            ├── badge.tsx
            ├── button.tsx
            ├── card.tsx
            ├── field.tsx
            ├── input.tsx
            ├── label.tsx
            ├── navigation-menu.tsx
            ├── separator.tsx
            ├── sonner.tsx
            ├── spinner.tsx
            ├── textarea.tsx
        ├── EditProfile.tsx
        ├── navbar.tsx
    └── 📁config
        ├── firebase.ts
        ├── Firebase.tsx
        ├── FirebaseServices.tsx
    └── 📁hooks
        ├── useAuthAction.tsx
        ├── useProfileAction.tsx
        ├── userUserActions.tsx
    └── 📁layouts
        ├── admin.layout.tsx
        ├── auth.layout.tsx
        ├── public.layout.tsx
        ├── root.layout.tsx
    └── 📁lib
        ├── utils.ts
        ├── zodSchemas.ts
    └── 📁pages
        └── 📁admin
            ├── chat.page.tsx
            ├── dashboard.page.tsx
            ├── profile.page.tsx
        └── 📁auth
            ├── login.page.tsx
            ├── register.page.tsx
        └── 📁public
            ├── home.page.tsx
            ├── not-found.page.tsx
    └── 📁schemas
        ├── userSchema.ts
    ├── App.tsx
    ├── index.css
    └── main.tsx
```
---

## Variables de entorno

Crea un archivo `.env.local` en la raiz del proyecto con las siguientes variables. Los valores los encontras en la consola de Firebase, en la configuracion del proyecto.
```env
VITE_FIREBASE_apiKey=""
VITE_FIREBASE_authDomain=""
VITE_FIREBASE_projectId=""
VITE_FIREBASE_storageBucket=""
VITE_FIREBASE_messagingSenderId=""
VITE_FIREBASE_appId=""
```

---

## Desarrollo local

Instalar dependencias:
```bash
npm i
```

Iniciar servidor de desarrollo:
```bash
npm run dev
```

---

## Deploy a Hosting de Firebase

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Iniciar sesion en Firebase
```bash
firebase login
```

### 3. Build del proyecto
```bash
npm run build
```

### 4. Inicializar el proyecto
```bash
firebase init
```

Durante la inicializacion, selecciona las siguientes opciones:

| Pregunta | Respuesta |
|---|---|
| What do you want to use as your public directory? | `dist` |
| Configure as a single-page app (rewrite all urls to /index.html)? | `Y` |
| File dist/index.html already exists. Overwrite? | `n` |

### 5. Desplegar
```bash
firebase deploy
```

#### Comandos de deploy individuales

Solo hosting:
```bash
firebase deploy --only hosting
```

Solo reglas de Firestore:
```bash
firebase deploy --only firestore:rules
```

---

## Base de datos

### Estructura de colecciones en Firestore
```
📁 /users (coleccion)
  📄 abc123uid (documento)
     ├── displayName: "María García"
     ├── email: "maria@example.com"
     └── photoURL: "https://example.com/avatars/maria.jpg"

  📄 def456uid (documento)
     ├── displayName: "Pepe Ñope"
     ├── email: "pepe@example.com"
     └── photoURL: "https://example.com/avatars/Pepe.jpg"

📁 /rooms (coleccion)
  📄 room_abc123_def456 (documento - Chat entre María y Pepe)
     ├── participants: ["abc123uid", "def456uid"]
     ├── createdAt: Timestamp(...)
     ├── lastMessage: {
     │    ├── text: "¡Nos vemos mañana!"
     │    ├── senderId: "abc123uid"
     │    └── timestamp: Timestamp(...)
     │   }
     └── 📁 messages (subcoleccion)
          ├── 📄 msg_001
          │    ├── text: "Hola Pepe, ¿cómo estás?"
          │    ├── senderId: "abc123uid"
          │    ├── timestamp: Timestamp(...)
          ├── 📄 msg_002
          │    └── ... (más mensajes)
          └── 📄 msg_003

  📄 room_abc123_ghi789 (documento - Chat entre María y Ana)
     ├── participants: ["abc123uid", "ghi789uid"]
     └── 📁 messages (subcoleccion)
          └── ... (mensajes privados entre María y Ana)
```

### Reglas de seguridad de Firestore

Las reglas estan definidas en `firestore.rules`. A continuacion un resumen de las restricciones aplicadas:

| Coleccion | Regla |
|---|---|
| `users` | Solo podes leer tu propio perfil y modificarlo si te pertenece |
| `rooms` | Solo podes ver o modificar salas en las que participas |
| `messages` | Solo podes leer o enviar mensajes en salas donde estas incluido |
| (general) | Prohibido traer listas completas (por privacidad) |

> Nota: Exponer las reglas de seguridad no es una buena practica en produccion. En este caso se hace de forma consciente al tratarse de un side-project.

Referencias:
- [Reglas de seguridad de Firestore](https://firebase.google.com/docs/firestore/security/get-started?hl=es-419)
- [Como estructurar reglas de seguridad](https://firebase.google.com/docs/firestore/security/rules-structure?hl=es-419)