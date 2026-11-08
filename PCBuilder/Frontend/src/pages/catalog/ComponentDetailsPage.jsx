import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  kompiuterioDalys,
  formatEuro,
  gautiDabartinęKainą,
  gautiAktyviąAkciją,
  gautiNuotraukas,
  gautiRodomusAtsiliepimus,
  gautiVidutinįĮvertinimą,
  gautiPaskyrosVardą,
  gautiPrototipoAtsiliepimus,
} from '../../data/mockData'
import { išsaugotiKrepšelį } from '../../data/demoCart'

function ComponentDetailsPage() {
  const { id } = useParams()
  const [įdėtasKiekis, setĮdėtasKiekis] = useState(null)
  const [pasirinktasKiekis, setPasirinktasKiekis] = useState(1)
  const dalis = kompiuterioDalys.find((d) => d.id === Number(id))
  const [aktyviNuotrauka, setAktyviNuotrauka] = useState(0)

  if (!dalis) {
    return (
      <section className="component-details-page">
        <div className="page-heading">
          <h1>Kompiuterio dalis</h1>
          <p>Peržiūrėkite išsamią kompiuterio dalies informaciją.</p>
        </div>

        <div className="component-info-card">
          <h2>Dalis nerasta</h2>
          <p>Pasirinkta kompiuterio dalis neegzistuoja arba nebėra pasiekiama.</p>

          <a href="/catalog" className="secondary-button">
            Į katalogą
          </a>
        </div>
      </section>
    )
  }

  const nuotraukos = gautiNuotraukas(dalis.id)
  const kaina = gautiDabartinęKainą(dalis.id)
  const akcija = kaina !== null ? gautiAktyviąAkciją(dalis.id) : null
  const akcijosKaina = akcija ? kaina * (1 - akcija.procentai / 100) : null
  // Naudojame jau sukurtus skaičiavimo metodus su prototipo duomenimis.
  const prototipoAtsiliepimai = gautiPrototipoAtsiliepimus()
  const atsiliepimai = gautiRodomusAtsiliepimus(dalis.id, prototipoAtsiliepimai)
    .sort((a, b) => b.paskelbimoData.localeCompare(a.paskelbimoData))
    .slice(0, 1)
  const { vidurkis, kiekis } = gautiVidutinįĮvertinimą(dalis.id, prototipoAtsiliepimai)

  return (
    <section className="component-details-page">
      <div className="page-heading">
        <h1>{dalis.pavadinimas}</h1>
        <p>Peržiūrėkite išsamią kompiuterio dalies informaciją.</p>
      </div>

      <div className="component-gallery">
        <div className="component-gallery-thumbs">
          {nuotraukos.map((nuotrauka, index) => (
            <button
              key={nuotrauka.eilėsNumeris}
              type="button"
              className={`component-gallery-thumb${index === aktyviNuotrauka ? ' is-active' : ''}`}
              onClick={() => setAktyviNuotrauka(index)}
            >
              <img src={nuotrauka.url} alt={nuotrauka.pavadinimas} />
            </button>
          ))}
        </div>

        <div className="component-gallery-main">
          {nuotraukos.length > 0 && (
            <img src={nuotraukos[aktyviNuotrauka].url} alt={dalis.pavadinimas} />
          )}
        </div>
      </div>

      <div className="component-info-card">
        <span className="component-info-manufacturer">{dalis.gamintojas}</span>
        <h2 className="component-title">{dalis.pavadinimas}</h2>

        <div className="component-price-block">
          {kaina === null ? (
            <span className="catalog-price-unavailable">Kaina nenurodyta</span>
          ) : akcija ? (
            <>
              <span className="catalog-price-old">{formatEuro(kaina)}</span>
              <span className="catalog-price-new">{formatEuro(akcijosKaina)}</span>
              <span className="discount-badge">-{akcija.procentai}%</span>
            </>
          ) : (
            <span className="catalog-price">{formatEuro(kaina)}</span>
          )}
        </div>

        <p className="component-stock">
          Sandėlio kiekis: <strong>{dalis.sandėlioKiekis} vnt.</strong>
        </p>

        <div className="order-cancel-actions cart-product-actions">
          <div className="cart-quantity-field">
            <label htmlFor="product-quantity">Kiekis</label>
            <div className="cart-quantity-control">
              <button
                type="button"
                aria-label="Sumažinti kiekį"
                disabled={pasirinktasKiekis <= 1 || dalis.sandėlioKiekis < 1}
                onClick={() => setPasirinktasKiekis((old) => Math.max(1, old - 1))}
              >−</button>
              <input
                id="product-quantity"
                type="number"
                min="1"
                max={Math.max(1, dalis.sandėlioKiekis)}
                step="1"
                value={pasirinktasKiekis}
                disabled={dalis.sandėlioKiekis < 1}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  if (Number.isFinite(value)) {
                    setPasirinktasKiekis(Math.min(dalis.sandėlioKiekis, Math.max(1, Math.floor(value))))
                  }
                }}
              />
              <button
                type="button"
                aria-label="Padidinti kiekį"
                disabled={pasirinktasKiekis >= dalis.sandėlioKiekis}
                onClick={() => setPasirinktasKiekis((old) => Math.min(dalis.sandėlioKiekis, old + 1))}
              >+</button>
            </div>
          </div>
          <button
            type="button"
            className="primary-button"
            disabled={dalis.sandėlioKiekis < 1 || kaina === null}
            onClick={() => {
              const kiekis = Math.min(pasirinktasKiekis, dalis.sandėlioKiekis)
              išsaugotiKrepšelį(dalis.id, kiekis)
              setĮdėtasKiekis(kiekis)
            }}
          >
            Į krepšelį
          </button>

          <a href={`/catalog/${dalis.id}/price-history`} className="secondary-button">
            Kainų istorija
          </a>
        </div>

        {įdėtasKiekis !== null && (
          <p role="status" className="component-stock">Įdėta į krepšelį: {įdėtasKiekis} vnt.</p>
        )}

        <h2 className="component-section-heading">Specifikacijos</h2>

        <table className="specs-table">
          <tbody>
            <tr>
              <td>Gamintojas</td>
              <td>{dalis.gamintojas}</td>
            </tr>
            <tr>
              <td>Modelis</td>
              <td>{dalis.modelis}</td>
            </tr>
            <tr>
              <td>Svoris</td>
              <td>{dalis.svoris}</td>
            </tr>
            <tr>
              <td>Matmenys</td>
              <td>{dalis.matmenys}</td>
            </tr>
            <tr>
              <td>Jungtys</td>
              <td>{dalis.jungtys.join(', ')}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="component-section-heading">Atsiliepimai</h2>

        <div className="reviews-preview-toolbar">
          <div className="reviews-summary">
            {kiekis > 0 ? (
              <>
                <span className="rating-stars">
                  {'★★★★★'.slice(0, Math.round(vidurkis))}
                  {'☆☆☆☆☆'.slice(0, 5 - Math.round(vidurkis))}
                </span>
                <span>
                  {vidurkis.toFixed(1)} iš 5 ({kiekis} atsiliepim{kiekis === 1 ? 'as' : 'ai'})
                </span>
              </>
            ) : (
              <span>Atsiliepimų kol kas nėra</span>
            )}
          </div>

          <Link to={`/catalog/${dalis.id}/reviews`} className="review-link-button">
            Visi atsiliepimai
          </Link>
        </div>

        {atsiliepimai.length === 0 ? (
          <div className="reviews-empty">Šiai daliai atsiliepimų kol kas nėra.</div>
        ) : (
          <div className="reviews-list">
            {atsiliepimai.map((atsiliepimas) => (
              <div key={atsiliepimas.id} className="review-card">
                <div className="review-card-header">
                  <span className="review-card-author">
                    {gautiPaskyrosVardą(atsiliepimas.autoriusId)}
                  </span>
                  <span className="review-card-date">{atsiliepimas.paskelbimoData}</span>
                </div>

                <span className="rating-stars">
                  {'★★★★★'.slice(0, atsiliepimas.įvertinimas)}
                  {'☆☆☆☆☆'.slice(0, 5 - atsiliepimas.įvertinimas)}
                </span>

                <p className="review-card-text">{atsiliepimas.tekstas}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <a href="/catalog" className="secondary-button">
        Į katalogą
      </a>
    </section>
  )
}

export default ComponentDetailsPage
