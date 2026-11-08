import { kompiuterioDalys, gautiDabartinęKainą, gautiAktyviąAkciją } from './mockData'

const RAKTAS = 'pcbuilder-demo-cart'

export function išsaugotiKrepšelį(dalisId, kiekis) {
  sessionStorage.setItem(RAKTAS, JSON.stringify({ dalisId, kiekis }))
}

export function pašalintiKrepšelį() {
  sessionStorage.removeItem(RAKTAS)
}

export function gautiKrepšelį() {
  let įrašas
  try {
    įrašas = JSON.parse(sessionStorage.getItem(RAKTAS))
  } catch {
    return null
  }

  const dalis = kompiuterioDalys.find((d) => d.id === Number(įrašas?.dalisId))
  const kiekis = Number(įrašas?.kiekis)
  if (!dalis || !Number.isInteger(kiekis) || kiekis < 1 || kiekis > dalis.sandėlioKiekis) return null

  const kaina = gautiDabartinęKainą(dalis.id)
  if (kaina === null) return null

  const akcija = gautiAktyviąAkciją(dalis.id)
  const vienetoKaina = akcija ? kaina * (1 - akcija.procentai / 100) : kaina
  return { dalis, kiekis, vienetoKaina, suma: vienetoKaina * kiekis }
}
