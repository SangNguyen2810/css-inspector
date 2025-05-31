# React Visual Node Editor with DevTools-like CSS Inspector

A modern, performant React + TypeScript visual editor for node-based UIs, featuring a right sidebar CSS inspector inspired by Chrome DevTools. Built for extensibility, live editing, and developer productivity.

## Features

- **Visual Node Editor:**  
  - Drag, select, and inspect nodes in a canvas.
  - Hierarchical node structure (supports children).

- **DevTools-like CSS Inspector:**  
  - Right sidebar for inspecting and editing node styles.
  - Live editing of inline styles (`element.style`), classes, and ids.
  - Add/remove arbitrary CSS properties, classes, and ids.
  - Visual feedback for invalid CSS properties (warning, strikethrough).
  - Chrome DevTools-inspired UI/UX.

- **Styling:**  
  - Built with [Tailwind CSS](https://tailwindcss.com/) for rapid, consistent styling.

- **Performance:**  
  - All components are optimized with `React.memo`, `useMemo`, and `useCallback` to minimize unnecessary re-renders.
  - Modular codebase with subcomponents organized in folders for maintainability.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

## Project Structure

```
src/
  components/
    CSSPropInput/
    CSSValueInput/
    StyleBlock/
      StyleBlock.tsx
      StyleBlockPropertyRow.tsx
      StyleBlockAddRow.tsx
    NodeTree/
    NodeRenderer/
    InspectorSidebar/
    CSSInspector/
  utils/
  types/
  constants/
  assets/
```

- **StyleBlock/**: Modular inspector UI, with subcomponents for property rows and add-row.
- **NodeRenderer/**: Renders nodes on the canvas.
- **InspectorSidebar/**: Right sidebar for node inspection and editing.

## Customization

- **Add new node types:** Extend the `NodeRenderer` and node configs.
- **Extend inspector:** Add new property editors or validation logic in `StyleBlock` and its subcomponents.

## Performance Tips

- All major components are memoized.
- Use stable props and callbacks to maximize performance.
- Avoid unnecessary context usage in deeply nested components.

## License

MIT
