import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { kompiuterioDalys } from '../../data/mockData'
import { kainos } from '../../data/mockData'

function HandleDelete(id) {
        if (confirm("Ar tikrai norite ištrinti komponentą (id " + id + ")?")) {
            alert('Komponento ištrynimas bus galimas prijungus duomenų bazę.')
        }
    }

function ComponentCreatorPage() {
    const { id } = useParams()
    const component = kompiuterioDalys.find((component) => component.id.toString() === id)

    if (!component && id !== "new") {
        return (
            <section className="order-details-page">
                <div className="page-heading">
                    <h1>Komponento peržiūra</h1>
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
        const [manufacturer, setManufacturer] = id === "new" ? 
            useState("") : useState(component.gamintojas);
        const [model, setModel] = id === "new" ? 
            useState("") : useState(component.modelis);
        const [price, setPrice] = id === "new" ?
            useState(0) : useState(kainos.findLast((price) => price.dalisId.toString() === id).kaina);
        const [connectors, setConnectors] = id === "new" ? 
            useState("") : useState(component.jungtys.join(', '));
        const [dimensions, setDimensions] = id === "new" ? 
            useState("") : useState(component.matmenys);

        
        function HandleSave() {
            alert('Komponento išsaugojimas bus galimas prijungus duomenų bazę.')
        }
        
        return (
            <section className="order-details-page">
                <div className="page-heading">
                    <h1>Komponento kūrimas/redagavimas</h1>
                </div>

                <div className="orders-table-container">

                    <div className="order-details-empty">

                        <table className="orders-table">
                            <tbody>
                            <tr>
                                <td>Gamintojas</td>
                                <td>
                                    <div className="payment-field">
                                        <input
                                            type="text"
                                            value={manufacturer}
                                            onChange={(e) => setManufacturer(e.target.value)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Modelis</td>
                                <td>
                                    <div className="payment-field">
                                        <textarea
                                            value={model}
                                            style={{height: "50px", border: "1px solid lightgray", borderRadius: "7px", fontSize: "14px"}}
                                            onChange={(e) => setModel(e.target.value)}
                                        />
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>Jungtys</td>
                                <td>
                                    <div className="payment-field">
                                        <textarea
                                            value={connectors}
                                            style={{height: "50px", border: "1px solid lightgray", borderRadius: "7px", fontSize: "14px"}}
                                            onChange={(e) => setConnectors(e.target.value)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Matmenys</td>
                                <td>
                                    <div className="payment-field">
                                        <textarea
                                            value={dimensions}
                                            style={{height: "50px", border: "1px solid lightgray", borderRadius: "7px", fontSize: "14px"}}
                                            onChange={(e) => setDimensions(e.target.value)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Kaina</td>
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
                            </tbody>
                        </table>

                        
                        <div style={{marginTop: "45px", marginBottom: "20px"}}>
                            <button className="primary-button"
                            onClick={HandleSave}>
                                Išsaugoti
                            </button>

                            <a style={{marginLeft: "10px"}} href={"/components/" + id + "/discount"} className="secondary-button">
                                        Akcijos taikymas
                            </a>

                            <button style={{marginLeft: "10px"}} className="danger-button" onClick={() => HandleDelete(component.id)}>Ištrinti</button>

                        </div>

                        <div className="order-cancel-actions">
                            <a href="/components" className="secondary-button">
                                Komponentų sąrašas
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

export default ComponentCreatorPage