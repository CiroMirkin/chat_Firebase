# Chat

(Deploy)[https://prueba-92c10.web.app/]

Tech Stack:

* TypeScript + Vite
* React + React Router (Declarativo)
* Firebase + [ReactFire](https://github.com/FirebaseExtended/reactfire)
* Zod + React-hook-form

Firebase services: Authentication, Firestore Database y Hosting.

Features: 

* Un usuario puede buscar a otro mediante su email.
* Un usuario puede enviar mensajes a otro.
* Un usuario puede cambiar su nombre.

Estructura del proyecto:

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

Reglas de Seguridad de Firestore:

* users → Solo lees tu perfil y puedes modificarlo si es tuyo.
* rooms → Solo puedes ver o modificar salas donde participas.
* messages → Solo puedes leer o enviar mensajes en salas donde estás.
* Prohibido traer listas completas (por privacidad).

Ubicación: `firestore.rules` (Se que no es una buena practica exponer las reglas de seguriadad pero al ser un side-proyecto me parece lo correcto).
Firebase docs: [Reglas de seguridad](https://firebase.google.com/docs/firestore/security/get-started?hl=es-419) - [Como Estructurar reglas de seguridad](https://firebase.google.com/docs/firestore/security/rules-structure?hl=es-419).


Árbol de colecciones y documentos dentro de Firestore:

```
📁 /users (colección)
  📄 abc123uid (documento)
     ├── displayName: "María García"
     ├── email: "maria@example.com"
     └── photoURL: "https://example.com/avatars/maria.jpg"

  📄 def456uid (documento)
     ├── displayName: "Pepe Ñope"
     ├── email: "pepe@example.com"
     └── photoURL: "https://example.com/avatars/Pepe.jpg"

📁 /rooms (colección)
  📄 room_abc123_def456 (documento - Chat entre María y Pepe)
     ├── participants: ["abc123uid", "def456uid"]
     ├── createdAt: Timestamp(...)
     ├── lastMessage: {
     │    ├── text: "¡Nos vemos mañana!"
     │    ├── senderId: "abc123uid"
     │    └── timestamp: Timestamp(...)
     │   }
     └── 📁 messages (subcolección)
          ├── 📄 msg_001
          │    ├── text: "Hola Pepe, ¿cómo estás?"
          │    ├── senderId: "abc123uid"
          │    ├── timestamp: Timestamp(...)
          ├── 📄 msg_002
          │    └── ... (más mensajes)
          └── 📄 msg_003

  📄 room_abc123_ghi789 (documento - Chat entre María y Ana)
     ├── participants: ["abc123uid", "ghi789uid"]
     └── 📁 messages (subcolección)
          └── ... (mensajes privados entre María y Ana)
```

`.env.local`

```
VITE_FIREBASE_apiKey=""
VITE_FIREBASE_authDomain=""
VITE_FIREBASE_projectId=""
VITE_FIREBASE_storageBucket=""
VITE_FIREBASE_messagingSenderId=""
VITE_FIREBASE_appId=""
```

## Desarrollo local

```
npm i
```

```
npm run dev
```

##  Deploy a Hosting de Firebase

Instalar Firebase CLI:

```
npm install -g firebase-tools
```
Iniciar sesión en Firebase:

```
firebase login
```
Inicializar el proyecto, antes ejecuta `npm run build`:

```
firebase init
```
Selecciona las siguientes opciones:

What do you want to use as your public directory? dist
Configure as a single-page app (rewrite all urls to /index.html)? Y
File dist/index.html already exists. Overwrite? n


Desplegar
```
firebase deploy
```

Desplegar Reglas
```
firebase deploy --only firestore:rules
```
Desplegar hosting
```
firebase deploy --only hosting
```