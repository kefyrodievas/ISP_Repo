import { useRef } from 'react';
import Popup from 'reactjs-popup';
import { kompiuterioDalys } from '../../data/mockData';
import { kainos } from '../../data/mockData';

const parts = 
[
    {
        id: 1,
        name: 'AMD Ryzen 7 7800X3D',
        quantity: 50,
        total: 17500
    },
    {
        id: 2,
        name: 'Intel Core i7-14700K',
        quantity: 40,
        total: 17501
    },
    {
        id: 3,
        name: 'AMD Ryzen 5 7600',
        quantity: 30,
        total: 17502
    },
    {
        id: 4,
        name: 'ASUS GeForce RTX 4070 Dual',
        quantity: 20,
        total: 17503
    },

]

var Filtrai = {
    dateFrom: '',
    dateTo: '',
}


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

function SalesReportPage() {
    // console.log("AAAAAAAA")
    const ref = useRef();  
    return (
        <section className="orders-page">
            <div className="page-heading">
                <h1>Pardavimų ataskaita</h1>
            </div>
        
            <form className="catalog-filters">
          <h2>Filtrai</h2>

          <div className="catalog-filter-group">
            <label>Data</label>
            <div className="catalog-price-range">
              <input
                type="number"
                min="0"
                placeholder="Nuo"
                value={Filtrai.dateFrom}
                // onChange={(event) => setFiltrai({ ...filtrai, kainaNuo: event.target.value })}
              />
              <span>–</span>
              <input
                type="number"
                min="0"
                placeholder="Iki"
                value={Filtrai.dateTo}
                // onChange={(event) => setFiltrai({ ...filtrai, kainaIki: event.target.value })}
              />
            </div>
          </div>

          <div className="catalog-filter-actions">
            <button type="submit" className="primary-button">
              Taikyti
            </button>
            <button type="button" className="secondary-button">
              Išvalyti
            </button>
          </div>
        </form>

            <div className="orders-table-container">

                <table className="orders-table">
                    <thead>
                    <tr>
                        <th>Pavadinimas</th>
                        <th>Bendrai parduota</th>
                        <th>Bendra suma</th>
                    </tr>
                    </thead>

                    <tbody>
                    {parts.map((part) => (
                        <tr key={part.id}>
                            <td>{part.name}</td>
                            <td>{part.quantity}</td>
                            <td>{part.total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <a href="/" className="secondary-button">
                Į pagrindinį puslapį
            </a>
        </section>
        
    )
}

export default SalesReportPage