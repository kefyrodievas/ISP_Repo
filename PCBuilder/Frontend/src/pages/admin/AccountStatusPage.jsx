import { useMemo, useState } from 'react'
import { paskyros, blokavimai } from '../../data/mockData'

function sudarytiPaskyrą(paskyra) {
  const blokavimas = blokavimai.find((b) => b.paskyrosId === paskyra.id) || null
  return { ...paskyra, blokavimas }
}

function šiandien() {
  return new Date().toISOString().slice(0, 10)
}

function BlokavimoModalas({ paskyra, onPatvirtinti, onAtšaukti }) {
  const [priežastis, setPriežastis] = useState('')
  const [pabaigosData, setPabaigosData] = useState('')
  const [informuoti, setInformuoti] = useState(true)

  function handleSubmit(event) {
    event.preventDefault()
    onPatvirtinti({
      priežastis,
      pabaigosData: pabaigosData || null,
      informuoti,
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Užblokuoti paskyrą</h2>
        <p>
          {paskyra.vardas} {paskyra.pavardė} ({paskyra.elPaštas})
        </p>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="priežastis">Priežastis</label>
            <textarea
              id="priežastis"
              rows={3}
              required
              value={priežastis}
              onChange={(event) => setPriežastis(event.target.value)}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="pabaigosData">
              Blokavimo pabaigos data <span>(neprivaloma, neribotam laikui – palikti tuščią)</span>
            </label>
            <input
              id="pabaigosData"
              type="date"
              value={pabaigosData}
              onChange={(event) => setPabaigosData(event.target.value)}
            />
          </div>

          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={informuoti}
              onChange={(event) => setInformuoti(event.target.checked)}
            />
            Informuoti naudotoją el. paštu
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onAtšaukti}>
              Atšaukti
            </button>
            <button type="submit" className="danger-button">
              Užblokuoti
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AccountStatusPage() {
  const [paskyrosSąrašas, setPaskyrosSąrašas] = useState(() => paskyros.map(sudarytiPaskyrą))
  const [paieška, setPaieška] = useState('')
  const [modalasPaskyrai, setModalasPaskyrai] = useState(null)
  const [pranešimas, setPranešimas] = useState('')

  const filtruotos = useMemo(() => {
    const paieškaMažom = paieška.trim().toLocaleLowerCase('lt')
    if (!paieškaMažom) {
      return paskyrosSąrašas
    }

    return paskyrosSąrašas.filter((paskyra) => {
      const vardas = `${paskyra.vardas} ${paskyra.pavardė}`.toLocaleLowerCase('lt')
      return vardas.includes(paieškaMažom) || paskyra.elPaštas.toLocaleLowerCase('lt').includes(paieškaMažom)
    })
  }, [paskyrosSąrašas, paieška])

  function užblokuoti(paskyrosId, duomenys) {
    setPaskyrosSąrašas((sąrašas) =>
      sąrašas.map((paskyra) =>
        paskyra.id === paskyrosId
          ? {
              ...paskyra,
              užblokuota: true,
              blokavimas: {
                paskyrosId,
                pradžiosData: šiandien(),
                pabaigosData: duomenys.pabaigosData,
                priežastis: duomenys.priežastis,
              },
            }
          : paskyra
      )
    )
    setModalasPaskyrai(null)
    setPranešimas('Būsena pakeista')
  }

  function aktyvuoti(paskyrosId) {
    setPaskyrosSąrašas((sąrašas) =>
      sąrašas.map((paskyra) =>
        paskyra.id === paskyrosId ? { ...paskyra, užblokuota: false, blokavimas: null } : paskyra
      )
    )
    setPranešimas('Būsena pakeista')
  }

  return (
    <section className="admin-page">
      <div className="page-heading">
        <h1>Paskyros</h1>
        <p>Peržiūrėkite naudotojų paskyras ir keiskite jų būseną.</p>
      </div>

      {pranešimas && <div className="admin-success-banner">{pranešimas}</div>}

      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="Paieška pagal vardą arba el. paštą"
          value={paieška}
          onChange={(event) => setPaieška(event.target.value)}
        />
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Vardas</th>
              <th>El. paštas</th>
              <th>Rolė</th>
              <th>Registracijos data</th>
              <th>Būsena</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtruotos.map((paskyra) => (
              <tr key={paskyra.id}>
                <td>
                  {paskyra.vardas} {paskyra.pavardė}
                </td>
                <td>{paskyra.elPaštas}</td>
                <td>{paskyra.rolė}</td>
                <td>{paskyra.registracijosData}</td>
                <td>
                  {paskyra.užblokuota ? (
                    <span className="status-badge status-badge-blocked">Užblokuota</span>
                  ) : (
                    <span className="status-badge status-badge-active">Aktyvi</span>
                  )}
                </td>
                <td>
                  <div className="admin-table-actions">
                    {paskyra.užblokuota ? (
                      <button
                        type="button"
                        className="admin-table-button"
                        onClick={() => aktyvuoti(paskyra.id)}
                      >
                        Aktyvuoti
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="admin-table-button admin-table-button-danger"
                        onClick={() => setModalasPaskyrai(paskyra)}
                      >
                        Užblokuoti
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filtruotos.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-table-empty">
                  Paskyrų pagal pasirinktus kriterijus nerasta.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalasPaskyrai && (
        <BlokavimoModalas
          paskyra={modalasPaskyrai}
          onPatvirtinti={(duomenys) => užblokuoti(modalasPaskyrai.id, duomenys)}
          onAtšaukti={() => setModalasPaskyrai(null)}
        />
      )}
    </section>
  )
}

export default AccountStatusPage
