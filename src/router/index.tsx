import React, {lazy, Suspense} from 'react'
import {Outlet, type RouteObject} from 'react-router-dom'

import Loading from '../components/loading/Loading'
import BaseLayout from '../layouts/BaseLayout'
import {APP_ROUTES} from './routes'

const SuspenseLoader = (Component: React.ComponentType) => () =>

  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>

const Landing = SuspenseLoader(
  lazy(async () => await import('../features/landing/Landing'))
)

const BaseLayoutView = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}

const publicRoutes: RouteObject[] = [
  {
    element: <BaseLayoutView />,
    children: [
      {path: APP_ROUTES.ROOT, element: <Landing />}
    ]
  }
]

export const router: RouteObject[] = [
  ...publicRoutes
]
