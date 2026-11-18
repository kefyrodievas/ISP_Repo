
import { gautiDabartinęKainą } from './mockData'
import { gautiKrepšelį, pašalintiKrepšelį } from './demoCart'

const RAKTAS = 'pcbuilder-demo-orders'
const API_URL = 'http://localhost:5197/api/orders'

function gautiDabartinęDatą() {
  const data = new Date()
  const metai = data.getFullYear()
  const mėnuo = String(data.getMonth() + 1).padStart(2, '0')
  const diena = String(data.getDate()).padStart(2, '0')

  return `${metai}-${mėnuo}-${diena}`
}

function sukurtiSiuntosKoda(id) {
  return `SHIP-${String(id).padStart(6, '0')}`
}

function išsaugotiUžsakymus(užsakymai) {
  sessionStorage.setItem(RAKTAS, JSON.stringify(užsakymai))

  fetch(`${API_URL}/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(užsakymai),
  }).catch(() => {})
}

export async function atnaujintiUžsakymusIšServerio() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) return false

    const serverioUžsakymai = await response.json()

    if (!Array.isArray(serverioUžsakymai)) return false

    if (serverioUžsakymai.length === 0) {
      const vietiniaiUžsakymai = gautiUžsakymus()

      if (vietiniaiUžsakymai.length > 0) {
        išsaugotiUžsakymus(vietiniaiUžsakymai)
      }

      return true
    }

    sessionStorage.setItem(RAKTAS, JSON.stringify(serverioUžsakymai))

    window.dispatchEvent(new Event('orders-updated'))

    return true
  } catch {
    return false
  }
}

export function gautiUžsakymus() {
  let užsakymai

  try {
    užsakymai = JSON.parse(sessionStorage.getItem(RAKTAS))
  } catch {
    užsakymai = null
  }

  if (!Array.isArray(užsakymai)) {
    užsakymai = []
    išsaugotiUžsakymus(užsakymai)
  } else {
    užsakymai = užsakymai.filter(
      (užsakymas) => užsakymas.id !== '0'
    )

    let pakeista = false

    užsakymai.forEach((užsakymas) => {
      if (užsakymas.shipmentCode === undefined) {
        užsakymas.shipmentCode = null
        pakeista = true
      }

      if (užsakymas.status === 'Sumokėtas' && !užsakymas.shipmentCode) {
        užsakymas.shipmentCode = sukurtiSiuntosKoda(užsakymas.id)
        pakeista = true
      }
    })

    if (pakeista) {
      išsaugotiUžsakymus(užsakymai)
    }
  }

  return užsakymai
}

export function gautiUžsakymą(id) {
  return gautiUžsakymus().find(
    (užsakymas) => užsakymas.id === String(id)
  ) || null
}

export function sukurtiUžsakymą() {
  const krepšelis = gautiKrepšelį()

  if (!krepšelis) return null

  const užsakymai = gautiUžsakymus()
  const dalis = krepšelis.dalis
  const dabartinėKaina = gautiDabartinęKainą(dalis.id)

  if (dabartinėKaina === null) return null

  const productSum = dabartinėKaina * krepšelis.kiekis
  const discount = Math.max(0, productSum - krepšelis.suma)

  const naujasUžsakymas = {
    id: String(
      Math.max(
        0,
        ...užsakymai.map((užsakymas) => Number(užsakymas.id) || 0)
      ) + 1
    ),
    creationDate: gautiDabartinęDatą(),
    paymentDate: null,
    deliveryDate: null,
    shipmentCode: null,
    configurations: [],
    parts: [{
      name: dalis.pavadinimas,
      quantity: krepšelis.kiekis,
    }],
    productSum,
    discount,
    status: 'Nesumokėtas',
    address: null,
  }

  užsakymai.push(naujasUžsakymas)
  išsaugotiUžsakymus(užsakymai)
  pašalintiKrepšelį()

  return naujasUžsakymas
}

export function atnaujintiUžsakymoAdresą(id, adresas) {
  const užsakymai = gautiUžsakymus()
  const užsakymas = užsakymai.find(
    (įrašas) => įrašas.id === String(id)
  )

  if (!užsakymas || užsakymas.status !== 'Nesumokėtas') return false

  užsakymas.address = { ...adresas }
  išsaugotiUžsakymus(užsakymai)

  return true
}

export function atnaujintiUžsakymoBūseną(id, būsena) {
  const užsakymai = gautiUžsakymus()
  const užsakymas = užsakymai.find(
    (įrašas) => įrašas.id === String(id)
  )

  if (!užsakymas) return false

  užsakymas.status = būsena

  if (būsena === 'Sumokėtas') {
    užsakymas.paymentDate = gautiDabartinęDatą()

    if (!užsakymas.shipmentCode) {
      užsakymas.shipmentCode = sukurtiSiuntosKoda(užsakymas.id)
    }
  }

  išsaugotiUžsakymus(užsakymai)

  return true
}

export function atšauktiUžsakymą(id) {
  const užsakymas = gautiUžsakymą(id)

  if (
    !užsakymas ||
    !['Nesumokėtas', 'Sumokėtas'].includes(užsakymas.status) ||
    užsakymas.deliveryDate
  ) {
    return false
  }

  return atnaujintiUžsakymoBūseną(id, 'Atšauktas')
}
