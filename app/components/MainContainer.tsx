import React, { FC, ReactNode } from 'react'

const MainContainer:FC<{children: ReactNode}> = ({children}) => {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 max-w-5xl m-auto">
      {children}
    </main>
  );
}

export default MainContainer