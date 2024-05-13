import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import New from '@/pages/New'
import Month from '@/pages/Month'
import Year from '@/pages/Year'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: 'month',
        element: <Month></Month>
      },
      {
        path: 'year',
        element: <Year></Year>
      }
    ]
  },
  {
    path: '/new',
    element: <New></New>
  }
])

export default router
