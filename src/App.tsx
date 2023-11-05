import { useEffect } from 'react'
import { BASE_64_ICONS } from './constants/app-constants';

const App = () => {
  useEffect(() => {
    createFreshsalesFavicon();
  }, [])

  const createFreshsalesFavicon = () => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = BASE_64_ICONS.FAVICON;
    }
  }

  return (
    <>
      <h1>Hello world!</h1>
    </>
  )
}

export default App
