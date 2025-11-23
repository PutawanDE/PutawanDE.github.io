---
layout: post
title:  "React New Activity Component — Hides Components Without Losing States"
tags: ["Web Development", "React"]
read_time: 5
---

## Introduction

Usually, when we want to hide our components in React we can use conditional rendering, or css `display: none`. If we use conditiional rendering, the states will be lost when it is hidden because the component will unmount. React 18 introduces `<Activity>` component a new feature designed to manage the visibility, especially for elements that are frequently toggled.

{% raw %}
```jsx
function App() {
  const [visible, setVisible] = useState(false)

  return (
    {/* Conditional Rendering*/}
    {visible && <p>Content</>}
    {/* or CSS Styling */}
    <p style={{display: visible ? 'block': 'none'}}>
      Content
    </p>
  )
}
```
{% endraw %}

## How It Works?

The `<Activity>` component allows you to manage the visibility of its children by using the `mode` prop.

{% raw %}
```jsx
<Activity mode={isShowingSidebar ? 'visible' : 'hidden'}>
  <Sidebar />
</Activity>
```
{% endraw %}

In my opinion, this is cleaner than conditional rendering, or conditional CSS styling.

- When `mode='hidden'`, React hides the component by applying `display: "none"` on CSS.
- It will also destroys their Effects and clean up any subscriptions.
- But the children will still re-render at a lower priority, if there are new props.
- When the mode changes to visible again, React will re-create the Effects and restore their previous states.

## Benefits

### State Preservation

If we use conditional rendering, the state is lost when the component unmounts. We can fix this by moving the state to the parent component. But this breaks encapsulation. It would be better if the state is kept inside the component. The new `<Activity>` component enables us to do this.

### DOM State Preservation

Because React applies `display: "none"` on CSS, the state of the DOM is preserved. Example, the user's input is not lost when the component unmounts.

### Pre-Rendering Content

The content that will become visible later, is pre-rendered. Because React renders the children at a lower priority when the mode is hidden.

### Speeding Up Page Interaction On Load for SSR

React uses Selective Hydration under-the-hood. It works by hydrating your app's HTML in chunks, allowing early interactions on some components even-though your whole code is not yet finished loading.

{% raw %}
```tsx
type Tab = 'Home' | 'HeavyComponent'

function Page() {
  const [selected, setSelected] = useState<Tab>('Home')

  return (
    <>
      <div className='tab-menu'>
        <button onClick={() => setSelected('Home')}>
          Home
        </button>
        <button onClick={() => setSelected('HeavyComponent')}>
          HeavyComponent
        </button>
      </div>

      {selected === 'Home' && <Home />}
      {selected === 'HeavyComponent' && <HeavyComponent />}
    </>
  )
}

export default App
```
{% endraw %}

If we use conditional rendering, React doesn't utilize Selective Hydration to separate our components into different chunks. It must hydrate the whole page which could lead to unresponsive tab buttons.

{% raw %}
```tsx
type Tab = 'Home' | 'HeavyComponent'

function Page() {
  const [selected, setSelected] = useState<Tab>('Home')

  return (
    <>
      <div className='tab-menu'>
        <button onClick={() => setSelected('Home')}>
          Home
        </button>
        <button onClick={() => setSelected('HeavyComponent')}>
          HeavyComponent
        </button>
      </div>

      <Activity mode={selected === 'Home' ? 'visible' : 'hidden'}>
        <Home />
      </Activity>
      <Activity mode={selected === 'HeavyComponent' ? 'visible' : 'hidden'}>
        <HeavyComponent />
      </Activity>
    </>
  )
}

export default App
```
{% endraw %}

This way React can separately hydrate tab menu, home and heavy component. The tab menu could be interactable first before the heavy component finishes loading.

## Demo

{% include codesandbox.html src="https://codesandbox.io/p/github/PutawanDE/react-activity-demo/main?import=true&embed=1&file=%2Fsrc%2FApp.tsx" %}

## When Not to Use

- **Permanent removal:** This is obvious. If we want to remove it completely why should it linger in memory?
- **When the component changes frequently and performance is critical:** Although it re-renders at a lower priority, it still consumes resources.
- **When the component's effect should always run when visible, regardless of previous state:** If you want to run the effects from a "fresh" state, you might prefer a full unmount and remount.

## References and Further Readings

- [Activity Api Reference - React](https://react.dev/reference/react/Activity)
