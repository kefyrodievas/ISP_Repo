import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import OrderListPage from './pages/orders/OrderListPage'
import OrderDetailsPage from './pages/orders/OrderDetailsPage'
import PaymentPage from './pages/orders/PaymentPage'
import PaymentResultPage from './pages/orders/PaymentResultPage'
import OrderCancelPage from './pages/orders/OrderCancelPage'
import ConfigurationListPage from './pages/configurations/ConfigurationListPage'
import ConfigurationBuilderPage from './pages/configurations/ConfigurationBuilderPage'
import ComponentCatalogPage from './pages/catalog/ComponentCatalogPage'
import ComponentDetailsPage from './pages/catalog/ComponentDetailsPage'

import './styles/global.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/forms.css'
import './styles/home.css'
import './styles/orders.css'
import './styles/popup.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <MainLayout>
              <OrderListPage />
            </MainLayout>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <MainLayout>
              <OrderDetailsPage />
            </MainLayout>
          }
        />

        <Route
          path="/orders/:id/payment"
          element={
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          }
        />

        <Route
          path="/orders/:id/payment/result"
          element={
            <MainLayout>
              <PaymentResultPage />
            </MainLayout>
          }
        />

        <Route
          path="/orders/:id/cancel"
          element={
            <MainLayout>
              <OrderCancelPage />
            </MainLayout>
          }
        />
          
        <Route
            path="/configurations"
            element={
                <MainLayout>
                    <ConfigurationListPage />
                </MainLayout>
            }
        />

          <Route
              path="/configurations/:id/build"
              element={
                  <MainLayout>
                      <ConfigurationBuilderPage />
                  </MainLayout>
              }
          />

          <Route
              path="/components"
              element={
                  <MainLayout>
                      <ComponentCatalogPage />
                  </MainLayout>
              }
          />

          <Route
              path="/components/:id"
              element={
                  <MainLayout>
                      <ComponentDetailsPage />
                  </MainLayout>
              }
          />
      </Routes>
    </BrowserRouter>
  )
}

export default App