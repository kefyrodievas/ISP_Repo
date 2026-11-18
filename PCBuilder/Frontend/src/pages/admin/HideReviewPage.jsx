import { useState } from 'react'
import { atsiliepimai, kompiuterioDalys, gautiPaskyrosVardą } from '../../data/mockData'

const PASLĖPTOS_BŪSENOS = ['Trintas vartotojo', 'Trintas administratoriaus']

function dalisPavadinimas(dalisId) {
  const dalis = kompiuterioDalys.find((d) => d.id === dalisId)
  return dalis ? dalis.pavadinimas : 'Nežinoma dalis'
}

function SlėpimoModalas({ atsiliepimas, onPatvirtinti, onAtšaukti }) {
  const [priežastis, setPriežastis] = useState('')

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ar tikrai slėpti?</h2>
        <p>
          „{atsiliepimas.tekstas}“ – komentaras bus pažymėtas kaip paslėptas ir nebematomas
          kitiems naudotojams.
        </p>

        <div className="modal-field">
          <label htmlFor="slėpimoPriežastis">Priežastis (neprivaloma)</label>
          <textarea
            id="slėpimoPriežastis"
            rows={3}
            value={priežastis}
            onChange={(event) => setPriežastis(event.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onAtšaukti}>
            Atšaukti
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={() => onPatvirtinti(priežastis)}
          >
            Slėpti
          </button>
        </div>
      </div>
    </div>
  )
}

function HideReviewPage() {
  const [sąrašas, setSąrašas] = useState(atsiliepimai)
  const [modalasAtsiliepimui, setModalasAtsiliepimui] = useState(null)
  const [pranešimas, setPranešimas] = useState('')

  function slėpti(atsiliepimoId, priežastis) {
    setSąrašas((esami) =>
      esami.map((atsiliepimas) =>
        atsiliepimas.id === atsiliepimoId
          ? {
              ...atsiliepimas,
              būsena: 'Trintas administratoriaus',
              administratoriausPriežastis: priežastis || null,
            }
          : atsiliepimas
      )
    )
    setModalasAtsiliepimui(null)
    setPranešimas('Komentaras paslėptas')
  }

  return (
    <section className="admin-page">
      <div className="page-heading">
        <h1>Atsiliepimai</h1>
        <p>Peržiūrėkite naudotojų atsiliepimus ir slėpkite netinkamą turinį.</p>
      </div>

      {pranešimas && <div className="admin-success-banner">{pranešimas}</div>}

      <div className="admin-table-container">
        {sąrašas.map((atsiliepimas) => {
          const paslėptas = PASLĖPTOS_BŪSENOS.includes(atsiliepimas.būsena)

          return (
            <div
              key={atsiliepimas.id}
              className={`review-row${paslėptas ? ' is-hidden' : ''}`}
            >
              <div className="review-row-header">
                <span className="review-row-part">{dalisPavadinimas(atsiliepimas.dalisId)}</span>

                <div className="review-row-meta">
                  <span>{gautiPaskyrosVardą(atsiliepimas.autoriusId)}</span>
                  <span>{'★★★★★'.slice(0, atsiliepimas.įvertinimas)}{'☆☆☆☆☆'.slice(0, 5 - atsiliepimas.įvertinimas)}</span>
                  <span>{atsiliepimas.paskelbimoData}</span>
                  {paslėptas ? (
                    <span className="status-badge status-badge-hidden">{atsiliepimas.būsena}</span>
                  ) : (
                    <span className="status-badge status-badge-active">{atsiliepimas.būsena}</span>
                  )}
                </div>
              </div>

              <p className="review-row-text">{atsiliepimas.tekstas}</p>

              {atsiliepimas.administratoriausPriežastis && (
                <p className="review-row-note">
                  Administratoriaus pastaba: {atsiliepimas.administratoriausPriežastis}
                </p>
              )}

              {!paslėptas && (
                <div className="admin-table-actions">
                  <button
                    type="button"
                    className="admin-table-button admin-table-button-danger"
                    onClick={() => setModalasAtsiliepimui(atsiliepimas)}
                  >
                    Slėpti
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {sąrašas.length === 0 && (
          <div className="admin-table-empty">Atsiliepimų kol kas nėra.</div>
        )}
      </div>

      {modalasAtsiliepimui && (
        <SlėpimoModalas
          atsiliepimas={modalasAtsiliepimui}
          onPatvirtinti={(priežastis) => slėpti(modalasAtsiliepimui.id, priežastis)}
          onAtšaukti={() => setModalasAtsiliepimui(null)}
        />
      )}
    </section>
  )
}

export default HideReviewPage
