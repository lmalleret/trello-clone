# trello-clone
Esta es una aplicación de tablero Kanban creada con React y TypeScript en el frontend, y Quarkus en el backend. La aplicación permite gestionar tareas y columnas, y proporciona funcionalidades como agregar, eliminar y reorganizar tareas y columnas.

## Características

- Crear, editar y eliminar columnas.
- Crear, editar y eliminar tareas dentro de las columnas.
- Reordenar columnas y tareas mediante arrastrar y soltar.
- Interfaz de usuario intuitiva con react-beautiful-dnd para la funcionalidad de arrastrar y soltar.

## Tecnologías Utilizadas

### Frontend

- React
- TypeScript
- react-beautiful-dnd
- Vite
- SCSS
- react-bootstrap

## Estructura del Proyecto

```plaintext
/
├── public
├── src
|   ├── Common
|   |   |── ConfirmModal.tsx
|   ├── actions
|   |   |── initData.ts
|   ├── assets
|   |   |── images
│   │       └── pexels-eberhardgross-691668.jpg
│   ├── components
│   │   ├── app-bar
│   │       ├── AppBar.scss
│   │       ├── AppBar.tsx
│   │   ├── board-bar
│   │       ├── BoardBar.scss
│   │       ├── BoardBar.tsx
│   │   ├── board-content
│   │       ├── BoardContent.scss
│   │       ├── BoardContent.tsx
│   │   ├── column
│   │       ├── Column.scss
│   │       ├── Column.tsx
│   │   └── task
│   │       ├── Task.scss
│   │       ├── Task.tsx
│   ├── contexts
│   │   └── boardContext.tsx
│   ├── types
│   │   ├── actionState.type.ts
│   │   ├── board.type.ts
│   │   ├── column.type.ts
│   │   └── task.type.ts
│   ├── utilities
│   │   ├── sorts.ts
│   ├── App.scss
│   ├── App.tsx
│   ├── index.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── vite.config.ts
└── README.md


## Instación y ejecución

Para instalar las dependencias del front:

```bash
  git clone <URL_DEL_REPOSITORIO>
  cd <NOMBRE_DEL_REPOSITORIO>
  npm install
```
Para iniciar la aplicación:
```bash
  npm run dev
```
