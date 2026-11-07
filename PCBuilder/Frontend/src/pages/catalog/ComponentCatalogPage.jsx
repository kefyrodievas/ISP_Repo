import { useMemo, useState } from 'react'
import {
  kompiuterioDalys,
  formatEuro,
  gautiDabartinęKainą,
  gautiAktyviąAkciją,
  gautiNuotraukas,
  gautiVidutinįĮvertinimą,
} from '../../data/mockData'

const kategorijos = [
  'CPU',
  'GPU',
  'RAM',
  'Motininė plokštė',
  'Maitinimo blokas',
  'Korpusas',
  'Aušintuvas',
  'Kaupiklis',
]

const gamintojai = Array.from(
  new Set(kompiuterioDalys.map((dalis) => dalis.gamintojas))
).sort((a, b) => a.localeCompare(b, 'lt'))

const tuščiFiltrai = {
  kategorija: '',
  gamintojas: '',
  kainaNuo: '',
  kainaIki: '',
}

function RatingStars({ vidurkis }) {
  const pilnos = Math.round(vidurkis)

  return (
    <>
      {'★★★★★'.slice(0, pilnos)}
      {'☆☆☆☆☆'.slice(0, 5 - pilnos)}
    </>
  )
}

function DalisKortelė({ dalis }) {
  const nuotrauka = gautiNuotraukas(dalis.id)[0]
  const kaina = gautiDabartinęKainą(dalis.id)
  const akcija = kaina !== null ? gautiAktyviąAkciją(dalis.id) : null
  const { vidurkis, kiekis } = gautiVidutinįĮvertinimą(dalis.id)
  const akcijosKaina = akcija ? kaina * (1 - akcija.procentai / 100) : null

  return (
    <a href={`/catalog/${dalis.id}`} className="catalog-card">
      <div className="catalog-card-image">
        {nuotrauka && <img src={nuotrauka.url} alt={dalis.pavadinimas} />}
        <span className="category-badge">{dalis.kategorija}</span>
        {akcija && <span className="discount-badge">-{akcija.procentai}%</span>}
      </div>

      <div className="catalog-card-body">
        <span className="catalog-card-manufacturer">{dalis.gamintojas}</span>
        <h3 className="catalog-card-title">{dalis.pavadinimas}</h3>

        <span className="rating-stars">
          <RatingStars vidurkis={vidurkis} />
          <span>{kiekis > 0 ? `(${kiekis})` : '(nėra atsiliepimų)'}</span>
        </span>

        <div className="catalog-card-price">
          {kaina === null ? (
            <span className="catalog-price-unavailable">Kaina nenurodyta</span>
          ) : akcija ? (
            <>
              <span className="catalog-price-old">{formatEuro(kaina)}</span>
              <span className="catalog-price-new">{formatEuro(akcijosKaina)}</span>
            </>
          ) : (
            <span className="catalog-price">{formatEuro(kaina)}</span>
          )}
        </div>
      </div>
    </a>
  )
}

function ComponentCatalogPage() {
  const [filtrai, setFiltrai] = useState(tuščiFiltrai)
  const [taikomiFiltrai, setTaikomiFiltrai] = useState(tuščiFiltrai)
  const [rūšiavimas, setRūšiavimas] = useState('naujausi')
  const [klaida, setKlaida] = useState('')

  function taikytiFiltrus(event) {
    event.preventDefault()

    const nuo = filtrai.kainaNuo === '' ? null : Number(filtrai.kainaNuo)
    const iki = filtrai.kainaIki === '' ? null : Number(filtrai.kainaIki)

    if (nuo !== null && iki !== null && nuo > iki) {
      setKlaida('Neteisingas kainų intervalas')
      return
    }

    setKlaida('')
    setTaikomiFiltrai(filtrai)
  }

  function išvalytiFiltrus() {
    setFiltrai(tuščiFiltrai)
    setTaikomiFiltrai(tuščiFiltrai)
    setKlaida('')
  }

  const rastosDalys = useMemo(() => {
    const nuo = taikomiFiltrai.kainaNuo === '' ? null : Number(taikomiFiltrai.kainaNuo)
    const iki = taikomiFiltrai.kainaIki === '' ? null : Number(taikomiFiltrai.kainaIki)

    const filtruotos = kompiuterioDalys.filter((dalis) => {
      if (taikomiFiltrai.kategorija && dalis.kategorija !== taikomiFiltrai.kategorija) {
        return false
      }

      if (taikomiFiltrai.gamintojas && dalis.gamintojas !== taikomiFiltrai.gamintojas) {
        return false
      }

      const kaina = gautiDabartinęKainą(dalis.id)

      if (nuo !== null && (kaina === null || kaina < nuo)) {
        return false
      }

      if (iki !== null && (kaina === null || kaina > iki)) {
        return false
      }

      return true
    })

    const surūšiuotos = [...filtruotos]

    surūšiuotos.sort((a, b) => {
      if (rūšiavimas === 'kaina-asc') {
        const kainaA = gautiDabartinęKainą(a.id) ?? Number.POSITIVE_INFINITY
        const kainaB = gautiDabartinęKainą(b.id) ?? Number.POSITIVE_INFINITY
        return kainaA - kainaB
      }

      if (rūšiavimas === 'kaina-desc') {
        const kainaA = gautiDabartinęKainą(a.id) ?? -1
        const kainaB = gautiDabartinęKainą(b.id) ?? -1
        return kainaB - kainaA
      }

      if (rūšiavimas === 'reitingas') {
        return gautiVidutinįĮvertinimą(b.id).vidurkis - gautiVidutinįĮvertinimą(a.id).vidurkis
      }

      return b.paskelbimoData.localeCompare(a.paskelbimoData)
    })

    return surūšiuotos
  }, [taikomiFiltrai, rūšiavimas])

  return (
    <section className="catalog-page">
      <div className="page-heading">
        <h1>Kompiuterio dalys</h1>
        <p>Rask ir palygink kompiuterio komponentus pagal kategoriją, gamintoją ir kainą.</p>
      </div>

      <div className="catalog-layout">
        <form className="catalog-filters" onSubmit={taikytiFiltrus}>
          <h2>Filtrai</h2>

          <div className="catalog-filter-group">
            <label htmlFor="kategorija">Kategorija</label>
            <select
              id="kategorija"
              value={filtrai.kategorija}
              onChange={(event) => setFiltrai({ ...filtrai, kategorija: event.target.value })}
            >
              <option value="">Visos kategorijos</option>
              {kategorijos.map((kategorija) => (
                <option key={kategorija} value={kategorija}>
                  {kategorija}
                </option>
              ))}
            </select>
          </div>

          <div className="catalog-filter-group">
            <label htmlFor="gamintojas">Gamintojas</label>
            <select
              id="gamintojas"
              value={filtrai.gamintojas}
              onChange={(event) => setFiltrai({ ...filtrai, gamintojas: event.target.value })}
            >
              <option value="">Visi gamintojai</option>
              {gamintojai.map((gamintojas) => (
                <option key={gamintojas} value={gamintojas}>
                  {gamintojas}
                </option>
              ))}
            </select>
          </div>

          <div className="catalog-filter-group">
            <label>Kaina (€)</label>
            <div className="catalog-price-range">
              <input
                type="number"
                min="0"
                placeholder="Nuo"
                value={filtrai.kainaNuo}
                onChange={(event) => setFiltrai({ ...filtrai, kainaNuo: event.target.value })}
              />
              <span>–</span>
              <input
                type="number"
                min="0"
                placeholder="Iki"
                value={filtrai.kainaIki}
                onChange={(event) => setFiltrai({ ...filtrai, kainaIki: event.target.value })}
              />
            </div>
          </div>

          <div className="catalog-filter-actions">
            <button type="submit" className="primary-button">
              Taikyti
            </button>
            <button type="button" className="secondary-button" onClick={išvalytiFiltrus}>
              Išvalyti
            </button>
          </div>
        </form>

        <div>
          <div className="catalog-toolbar">
            <span className="catalog-results-count">Rasta dalių: {rastosDalys.length}</span>

            <div className="catalog-sort">
              <label htmlFor="rūšiavimas">Rūšiuoti</label>
              <select
                id="rūšiavimas"
                value={rūšiavimas}
                onChange={(event) => setRūšiavimas(event.target.value)}
              >
                <option value="naujausi">Naujausi</option>
                <option value="kaina-asc">Kaina didėjančiai</option>
                <option value="kaina-desc">Kaina mažėjančiai</option>
                <option value="reitingas">Reitingas</option>
              </select>
            </div>
          </div>

          {klaida ? (
            <div className="catalog-error">{klaida}</div>
          ) : rastosDalys.length === 0 ? (
            <div className="catalog-empty">Kompiuterio dalių nėra</div>
          ) : (
            <div className="catalog-grid">
              {rastosDalys.map((dalis) => (
                <DalisKortelė key={dalis.id} dalis={dalis} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ComponentCatalogPage
