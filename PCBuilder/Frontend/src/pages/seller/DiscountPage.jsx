import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { kompiuterioDalys } from '../../data/mockData'
import { kainos } from '../../data/mockData'

function DiscountPage() {
    const { id } = useParams()
    const component = kompiuterioDalys.find((component) => component.id.toString() === id)
    if (!component) {
        return (
            <section className="order-details-page">
                <div className="page-heading">
                    <h1>Akcijos taikymas</h1>
                </div>

                <div className="order-details-empty">
                    <h2>Komponentas nerastas</h2>
                    <p>Pasirinktas komponentas neegzistuoja arba nebėra pasiekiamas.</p>

                    <div className="order-cancel-actions">
                        <a href="/configurations" className="secondary-button">
                            Komponentai
                        </a>
                        <a href="/" className="primary-button">
                            Į pagrindinį puslapį
                        </a>
                    </div>
                </div>
            </section>
        )
    }
    else {
        const [price, setPrice] = useState(kainos.findLast((price) => price.dalisId.toString() === id).kaina);
        const [dateFrom, setDateFrom] = useState("");
        const [dateTo, setDateTo] = useState("");

        
        function HandleSave() {
            alert('Akcijos išsaugojimas bus galimas prijungus duomenų bazę.')
        }
        
        return (
            <section className="order-details-page">
                <div className="page-heading">
                    <h1>Akcijos taikymas</h1>
                </div>

                <div className="orders-table-container">

                    <div className="order-details-empty">

                        <table className="orders-table">
                            <tbody>
                            <tr>
                                <td>Procentai</td>
                                <td>
                                    <div className="payment-field" style={{width: "50%"}}>
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>Pradžios data</td>
                                <td>
                                    <div className="payment-field">
                                        <input
                                            type="date"
                                            value={dateFrom}
                                            style={{height: "50px", border: "1px solid lightgray", borderRadius: "7px", fontSize: "14px"}}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Pabaigos data</td>
                                <td>
                                    <div className="payment-field">
                                        <input
                                            type="date"
                                            value={dateTo}
                                            style={{height: "50px", border: "1px solid lightgray", borderRadius: "7px", fontSize: "14px"}}
                                            onChange={(e) => setDateTo(e.target.value)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        
                        <div style={{marginTop: "45px", marginBottom: "20px"}}>
                            <button className="primary-button"
                            onClick={HandleSave}>
                                Išsaugoti
                            </button>
                        </div>

                        <div className="order-cancel-actions">
                            <a href={"/components/" + id} className="secondary-button">
                                Komponentas
                            </a>

                            <a href="/" className="secondary-button">
                                Į pagrindinį puslapį
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    
}

export default DiscountPage