
import { computerParts, getCurrentPrice, getActivePromotion } from './mockData'

const KEY = 'pcbuilder-demo-cart'

export function saveCart(partId, quantity) {
  sessionStorage.setItem(KEY, JSON.stringify({ partId, quantity }))
}

export function removeCart() {
  sessionStorage.removeItem(KEY)
}

export function getCart() {
  let entry

  try {
    entry = JSON.parse(sessionStorage.getItem(KEY))
  } catch {
    return null
  }

  const part = computerParts.find((item) => item.id === Number(entry?.partId))
  const quantity = Number(entry?.quantity)

  if (!part || !Number.isInteger(quantity) || quantity < 1 || quantity > part.stockQuantity) {
    return null
  }

  const price = getCurrentPrice(part.id)

  if (price === null) return null

  const promotion = getActivePromotion(part.id)
  const unitPrice = promotion ? price * (1 - promotion.percentage / 100) : price

  return {
    part,
    quantity,
    unitPrice,
    total: unitPrice * quantity,
  }
}
