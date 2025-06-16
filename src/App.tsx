import { useState, version } from 'react'
import MyPage from './MyPage'
import { useNextClient, McpContext } from '@opentiny/next-react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const defaultSessionId = crypto.randomUUID()
  let id: any = defaultSessionId
  if (sessionStorage.getItem('sessionId')) {
    id = sessionStorage.getItem('sessionId')
  } else {
    sessionStorage.setItem('sessionId', id)
  }

  const { sessionId, transport } = useNextClient({
    clientInfo: { name: 'my-project', version: '1.0.0' },
    proxyOptions: {
      url: 'https://agent.icjs.ink/sse',
      token: '',
      sessionId: id
    }
  })

  console.log('sessionId======:', sessionId)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>React version: {version}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <p style={{ 'display': 'block' }}>sessionId: https://agent.icjs.ink/sse?sessionId={sessionId}</p>
      <McpContext.Provider value={{ transport }}>
        <MyPage />
      </McpContext.Provider>
    </>
  )
}

export default App
