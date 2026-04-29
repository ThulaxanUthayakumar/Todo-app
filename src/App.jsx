// ============================================================
// REACT CONCEPTS COVERED IN THIS FILE:
//
//  1. useState      — storing & updating data
//  2. Props         — passing data into components
//  3. Event handlers — responding to user actions
//  4. Conditional rendering — showing different UI based on state
//  5. List rendering — turning an array into UI elements (.map)
//  6. Controlled inputs — keeping input value in sync with state
//  7. Component composition — breaking UI into small pieces
// ============================================================

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────
// We start with a few sample todos so the app isn't empty.
// Each todo is an object with an id, text, and completed flag.
const INITIAL_TODOS = [
  { id: 1, text: "Learn React useState hook", completed: true },
  { id: 2, text: "Understand props and components", completed: false },
  { id: 3, text: "Build a todo app from scratch", completed: false },
];

// ─── STYLES ──────────────────────────────────────────────────
// Inline style objects — like CSS but written in JavaScript.
// camelCase instead of kebab-case: "font-size" → "fontSize"
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0e11",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "60px 16px",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
  },
  header: {
    marginBottom: "32px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#7c6af7",
    marginBottom: "8px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    color: "#f0eeff",
    margin: 0,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b6880",
    marginTop: "6px",
  },
  // ── Filter bar ──
  filterBar: {
    display: "flex",
    gap: "6px",
    marginBottom: "20px",
  },
  filterBtn: (active) => ({
    padding: "6px 14px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.15s",
    background: active ? "#7c6af7" : "#1e1c26",
    color: active ? "#fff" : "#6b6880",
  }),
  // ── Input row ──
  inputRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #2a2733",
    background: "#1a1820",
    color: "#f0eeff",
    fontSize: "14px",
    outline: "none",
  },
  addBtn: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#7c6af7",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  // ── Todo list ──
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  todoItem: (completed) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "#1a1820",
    border: "1.5px solid #2a2733",
    transition: "opacity 0.2s",
    opacity: completed ? 0.5 : 1,
  }),
  checkbox: {
    width: "20px",
    height: "20px",
    borderRadius: "6px",
    border: "2px solid #3a3650",
    background: "transparent",
    cursor: "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    width: "20px",
    height: "20px",
    borderRadius: "6px",
    background: "#7c6af7",
    border: "2px solid #7c6af7",
    cursor: "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "12px",
  },
  todoText: (completed) => ({
    flex: 1,
    fontSize: "14px",
    color: completed ? "#4a4760" : "#c8c2e8",
    textDecoration: completed ? "line-through" : "none",
  }),
  deleteBtn: {
    background: "none",
    border: "none",
    color: "#3a3650",
    cursor: "pointer",
    fontSize: "16px",
    padding: "2px 6px",
    borderRadius: "6px",
    lineHeight: 1,
  },
  // ── Footer ──
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    fontSize: "13px",
    color: "#4a4760",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#4a4760",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
    textDecoration: "underline",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 0",
    color: "#4a4760",
    fontSize: "14px",
  },
};


// ════════════════════════════════════════════════════════════
// COMPONENT 1: TodoItem
// ─────────────────────────────────────────────────────────────
// A single row in the list.
//
// PROPS explained:
//   todo      → the todo object { id, text, completed }
//   onToggle  → function to call when checkbox is clicked
//   onDelete  → function to call when delete is clicked
//
// Props are how a PARENT passes data DOWN to a child component.
// The child never modifies props directly — it calls the
// functions the parent gave it instead.
// ════════════════════════════════════════════════════════════
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={styles.todoItem(todo.completed)}>

      {/* Checkbox — calls onToggle with this todo's id */}
      <button
        style={todo.completed ? styles.checkboxDone : styles.checkbox}
        onClick={() => onToggle(todo.id)}
        aria-label="toggle todo"
      >
        {/* CONDITIONAL RENDERING: show checkmark only when completed */}
        {todo.completed && "✓"}
      </button>

      {/* Todo text — strikethrough when completed */}
      <span style={styles.todoText(todo.completed)}>
        {todo.text}
      </span>

      {/* Delete button */}
      <button
        style={styles.deleteBtn}
        onClick={() => onDelete(todo.id)}
        aria-label="delete todo"
      >
        ✕
      </button>
    </div>
  );
}


// ════════════════════════════════════════════════════════════
// COMPONENT 2: App  (the main / root component)
// ─────────────────────────────────────────────────────────────
// This is where all the STATE lives.
//
// STATE = data that can change over time, causing a re-render.
//
// Rule of thumb: put state in the CLOSEST common ancestor of
// all components that need to read or update it.
// ════════════════════════════════════════════════════════════
export default function App() {

  // ── useState hooks ──────────────────────────────────────
  // useState(initialValue) returns [currentValue, setterFunction]
  // When you call the setter, React re-renders the component.

  const [todos, setTodos]       = useState(INITIAL_TODOS); // array of todo objects
  const [inputText, setInputText] = useState("");           // what the user is typing
  const [filter, setFilter]     = useState("all");          // "all" | "active" | "done"


  // ── Event handlers ──────────────────────────────────────
  // These are plain JS functions. We pass them DOWN as props.

  // Add a new todo when user submits
  function handleAdd() {
    const trimmed = inputText.trim();
    if (!trimmed) return; // do nothing if input is empty

    const newTodo = {
      id: Date.now(),    // quick unique id using timestamp
      text: trimmed,
      completed: false,
    };

    // NEVER mutate state directly!
    // Always create a new array / object and pass it to the setter.
    setTodos([...todos, newTodo]);  // spread existing todos, add new one
    setInputText("");               // clear the input
  }

  // Toggle completed status of a todo
  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // flip this one
          : todo                                     // leave others alone
      )
    );
  }

  // Delete a todo by id
  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Delete all completed todos
  function handleClearDone() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  // Allow pressing Enter to add a todo
  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }


  // ── Derived data ────────────────────────────────────────
  // We COMPUTE these from state — no need to store them separately.

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "done")   return todo.completed;
    return true; // "all"
  });

  const remaining = todos.filter((t) => !t.completed).length;
  const doneCount = todos.filter((t) => t.completed).length;


  // ── JSX (what gets rendered) ─────────────────────────────
  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={styles.page}>
        <div style={styles.card}>

          {/* ── Header ── */}
          <div style={styles.header}>
            <div style={styles.eyebrow}>My workspace</div>
            <h1 style={styles.title}>Tasks</h1>
            <p style={styles.subtitle}>
              {remaining} remaining · {doneCount} done
            </p>
          </div>

          {/* ── Filter buttons ──
              CONTROLLED: the active filter comes from state,
              clicking a button updates state → re-render */}
          <div style={styles.filterBar}>
            {["all", "active", "done"].map((f) => (
              <button
                key={f}
                style={styles.filterBtn(filter === f)}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* ── Input row ──
              CONTROLLED INPUT: inputText state drives the value.
              onChange keeps state in sync with what the user types. */}
          <div style={styles.inputRow}>
            <input
              style={styles.input}
              type="text"
              placeholder="Add a new task…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button style={styles.addBtn} onClick={handleAdd}>
              Add
            </button>
          </div>

          {/* ── Todo list ──
              LIST RENDERING: .map() turns each todo object into a
              <TodoItem> component. The key prop helps React track
              which items changed — always use a unique, stable id. */}
          <div style={styles.list}>
            {filteredTodos.length === 0 ? (
              // CONDITIONAL RENDERING: empty state message
              <div style={styles.emptyState}>
                {filter === "done"
                  ? "No completed tasks yet."
                  : "Nothing here — add a task above!"}
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}             // pass the data down
                  onToggle={handleToggle} // pass the handler down
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>

          {/* ── Footer ── */}
          {doneCount > 0 && (
            <div style={styles.footer}>
              <span>{doneCount} task{doneCount !== 1 ? "s" : ""} completed</span>
              <button style={styles.clearBtn} onClick={handleClearDone}>
                Clear done
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
