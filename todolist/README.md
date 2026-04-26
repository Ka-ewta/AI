# TodoList Web App (No DB)

A lightweight, clickable TodoList prototype built with plain HTML, CSS, and JavaScript.
This project is designed to run in any modern browser and supports both desktop and mobile screens.

## Features

- Add todo item with a deadline
- Remove todo item
- Separate tabs: `Work` and `Private`
- Responsive UI for web and mobile usage
- In-memory state only (no database)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)

## Project Structure

```text
todolist/
├── index.html      # App layout and UI structure
├── styles.css      # Styling and responsive behavior
├── app.js          # App state and interaction logic
└── promps.md       # Chat prompt history log
```

## How to Run

1. Open the `todolist` folder.
2. Double-click `index.html`, or open it with your browser.
3. Start adding tasks.

No installation, build tool, or backend is required.

## Testing

This project includes:
- Unit tests (business logic): `Vitest`
- Automation / end-to-end tests (UI flow): `Playwright`

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npm test
```

### Run unit tests only

```bash
npm run test:unit
```

### Run automation tests only

```bash
npm run test:e2e
```

## How to Use

1. Choose a tab (`Work` or `Private`).
2. Enter task title and deadline.
3. Click **Add item**.
4. Click **Remove** to delete any task.

## Engineering Notes

- The code follows a clean and modular structure:
  - State is centralized in `state`
  - DOM references are grouped in `dom`
  - Rendering and event handlers are separated
- Validation is handled before item creation
- UI updates are done through dedicated render functions

## Limitations

- Data is not persisted after page refresh (no local storage / no DB)
- No authentication or multi-user support

## Future Improvements

- Persist data with `localStorage`
- Add complete/undo task status
- Sort and filter by deadline
- Progressive Web App (PWA) support

## License

This project is for learning and prototype purposes.
