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
import ComponentCatalogPage from './pages/catalog/ComponentCatalogPage'
import ComponentDetailsPage from './pages/catalog/ComponentDetailsPage'
import PriceHistoryPage from './pages/catalog/PriceHistoryPage'
import AccountStatusPage from './pages/admin/AccountStatusPage'
import HideReviewPage from './pages/admin/HideReviewPage'

import './styles/global.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/forms.css'
import './styles/home.css'
import './styles/orders.css'
import './styles/catalog.css'
import './styles/admin.css'

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
          path="/catalog"
          element={
            <MainLayout>
              <ComponentCatalogPage />
            </MainLayout>
          }
        />

        <Route
          path="/catalog/:id"
          element={
            <MainLayout>
              <ComponentDetailsPage />
            </MainLayout>
          }
        />

        <Route
          path="/catalog/:id/price-history"
          element={
            <MainLayout>
              <PriceHistoryPage />
            </MainLayout>
          }
        />

        <Route
          path="/admin/accounts"
          element={
            <MainLayout>
              <AccountStatusPage />
            </MainLayout>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <MainLayout>
              <HideReviewPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App