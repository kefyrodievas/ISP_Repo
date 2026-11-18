
import { getCurrentPrice } from './mockData'
import { getCart, removeCart } from './demoCart'

const STORAGE_KEY = 'pcbuilder-demo-orders'
const API_URL = 'http://localhost:5197/api/orders'

function getCurrentDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function createShipmentCode(id) {
  return `SHIP-${String(id).padStart(6, '0')}`
}

function saveOrders(orders) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orders))

  fetch(`${API_URL}/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orders),
  }).catch(() => {})
}

export async function updateOrdersFromServer() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) return false

    const serverOrders = await response.json()

    if (!Array.isArray(serverOrders)) return false

    if (serverOrders.length === 0) {
      const localOrders = getOrders()

      if (localOrders.length > 0) {
        saveOrders(localOrders)
      }

      return true
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serverOrders))

    window.dispatchEvent(new Event('orders-updated'))

    return true
  } catch {
    return false
  }
}

export function getOrders() {
  let orders

  try {
    orders = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  } catch {
    orders = null
  }

  if (!Array.isArray(orders)) {
    orders = []
    saveOrders(orders)
  } else {
    orders = orders.filter(
      (order) => order.id !== '0'
    )

    let changed = false

    orders.forEach((order) => {
      if (order.shipmentCode === undefined) {
        order.shipmentCode = null
        changed = true
      }

      if (order.status === 'Sumokėtas' && !order.shipmentCode) {
        order.shipmentCode = createShipmentCode(order.id)
        changed = true
      }
    })

    if (changed) {
      saveOrders(orders)
    }
  }

  return orders
}

export function getOrder(id) {
  return getOrders().find(
    (order) => order.id === String(id)
  ) || null
}

export function createOrder() {
  const cart = getCart()

  if (!cart) return null

  const orders = getOrders()
  const part = cart.part
  const currentPrice = getCurrentPrice(part.id)

  if (currentPrice === null) return null

  const productSum = currentPrice * cart.quantity
  const discount = Math.max(0, productSum - cart.total)

  const newOrder = {
    id: String(
      Math.max(
        0,
        ...orders.map((order) => Number(order.id) || 0)
      ) + 1
    ),
    creationDate: getCurrentDate(),
    paymentDate: null,
    deliveryDate: null,
    shipmentCode: null,
    configurations: [],
    parts: [{
      name: part.name,
      quantity: cart.quantity,
    }],
    productSum,
    discount,
    status: 'Nesumokėtas',
    address: null,
  }

  orders.push(newOrder)
  saveOrders(orders)
  removeCart()

  return newOrder
}

export function updateOrderAddress(id, address) {
  const orders = getOrders()
  const order = orders.find(
    (entry) => entry.id === String(id)
  )

  if (!order || order.status !== 'Nesumokėtas') return false

  order.address = { ...address }
  saveOrders(orders)

  return true
}

export function updateOrderStatus(id, status) {
  const orders = getOrders()
  const order = orders.find(
    (entry) => entry.id === String(id)
  )

  if (!order) return false

  order.status = status

  if (status === 'Sumokėtas') {
    order.paymentDate = getCurrentDate()

    if (!order.shipmentCode) {
      order.shipmentCode = createShipmentCode(order.id)
    }
  }

  saveOrders(orders)

  return true
}

export function cancelOrder(id) {
  const order = getOrder(id)

  if (
    !order ||
    !['Nesumokėtas', 'Sumokėtas'].includes(order.status) ||
    order.deliveryDate
  ) {
    return false
  }

  return updateOrderStatus(id, 'Atšauktas')
}
