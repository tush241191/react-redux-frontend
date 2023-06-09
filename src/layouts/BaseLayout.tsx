import React, {type ReactNode} from 'react'

import Header from './Header'

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({children}: BaseLayoutProps) => {
  return (
    <div className="w-full h-full min-h-screen bg-white">
      <Header />
      <main>
        <div className="relative pt-16 mx-auto isolate max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}

export default BaseLayout
