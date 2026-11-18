
import { useMemo, useState } from 'react'
import { accounts, blocks } from '../../data/mockData'

function createAccount(account) {
  const block = blocks.find((b) => b.accountId === account.id) || null
  return { ...account, block }
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function BlockAccountModal({ account, onConfirm, onCancel }) {
  const [reason, setReason] = useState('')
  const [endDate, setEndDate] = useState('')
  const [notifyUser, setNotifyUser] = useState(true)

  function handleSubmit(event) {
    event.preventDefault()
    onConfirm({
      reason,
      endDate: endDate || null,
      notifyUser,
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Užblokuoti paskyrą</h2>
        <p>
          {account.firstName} {account.lastName} ({account.email})
        </p>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="reason">Priežastis</label>
            <textarea
              id="reason"
              rows={3}
              required
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="endDate">
              Blokavimo pabaigos data <span>(neprivaloma, neribotam laikui – palikti tuščią)</span>
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={notifyUser}
              onChange={(event) => setNotifyUser(event.target.checked)}
            />
            Informuoti naudotoją el. paštu
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onCancel}>
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
  const [accountList, setAccountList] = useState(() => accounts.map(createAccount))
  const [search, setSearch] = useState('')
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [message, setMessage] = useState('')

  const filteredAccounts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('lt')

    if (!normalizedSearch) {
      return accountList
    }

    return accountList.filter((account) => {
      const fullName = `${account.firstName} ${account.lastName}`.toLocaleLowerCase('lt')
      return (
        fullName.includes(normalizedSearch) ||
        account.email.toLocaleLowerCase('lt').includes(normalizedSearch)
      )
    })
  }, [accountList, search])

  function blockAccount(accountId, data) {
    setAccountList((list) =>
      list.map((account) =>
        account.id === accountId
          ? {
              ...account,
              blocked: true,
              block: {
                accountId,
                startDate: today(),
                endDate: data.endDate,
                reason: data.reason,
              },
            }
          : account
      )
    )

    setSelectedAccount(null)
    setMessage('Būsena pakeista')
  }

  function activateAccount(accountId) {
    setAccountList((list) =>
      list.map((account) =>
        account.id === accountId
          ? { ...account, blocked: false, block: null }
          : account
      )
    )

    setMessage('Būsena pakeista')
  }

  return (
    <section className="admin-page">
      <div className="page-heading">
        <h1>Paskyros</h1>
        <p>Peržiūrėkite naudotojų paskyras ir keiskite jų būseną.</p>
      </div>

      {message && <div className="admin-success-banner">{message}</div>}

      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="Paieška pagal vardą arba el. paštą"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td>
                  {account.firstName} {account.lastName}
                </td>
                <td>{account.email}</td>
                <td>{account.role}</td>
                <td>{account.registrationDate}</td>
                <td>
                  {account.blocked ? (
                    <span className="status-badge status-badge-blocked">Užblokuota</span>
                  ) : (
                    <span className="status-badge status-badge-active">Aktyvi</span>
                  )}
                </td>
                <td>
                  <div className="admin-table-actions">
                    {account.blocked ? (
                      <button
                        type="button"
                        className="admin-table-button"
                        onClick={() => activateAccount(account.id)}
                      >
                        Aktyvuoti
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="admin-table-button admin-table-button-danger"
                        onClick={() => setSelectedAccount(account)}
                      >
                        Užblokuoti
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-table-empty">
                  Paskyrų pagal pasirinktus kriterijus nerasta.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedAccount && (
        <BlockAccountModal
          account={selectedAccount}
          onConfirm={(data) => blockAccount(selectedAccount.id, data)}
          onCancel={() => setSelectedAccount(null)}
        />
      )}
    </section>
  )
}

export default AccountStatusPage
