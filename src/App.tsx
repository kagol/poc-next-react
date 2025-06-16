import { version } from 'react'
import CompanyList from './CompanyList'
import { useNextClient, McpContext } from '@opentiny/next-react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let id: any
  if (sessionStorage.getItem('sessionId')) {
    id = sessionStorage.getItem('sessionId')
  } else {
    id = crypto.randomUUID()
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
      <h1>Vite + React + @opentiny/next-react</h1>
      <p>React version: {version}</p>

      <p>sessionId: https://agent.icjs.ink/sse?sessionId={sessionId}</p>
      <McpContext.Provider value={{ transport }}>
        <CompanyList />
      </McpContext.Provider>
    </>
  )
}

export default App
