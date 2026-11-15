import { useParams } from 'react-router-dom'
import { useState } from 'react'

const builds = [
    {
        id: 1,
        title: 'Žaidimų kompiuteris',
        description: 'Mano pirma komplektacija',
        price_limit: 3000,
        parts: [
            {
                id: 1,
                name: 'AMD Ryzen 7 9700X',
                quantity: 1,
                price: 278.60,
                discount: 0
            },
            {
                id: 2,
                name: 'NVIDIA GeForce RTX 4090',
                quantity: 1,
                price: 2235.70,
                discount: 5
            },
            {
                id: 3,
                name: '8GB DDR4 RAM stick',
                quantity: 4,
                price: 50.35,
                discount: 0
            }
        ]
    }
]

// function HandleDelete(id) {
//     alert('Komplektacijos ištrynimas bus galimas prijungus duomenų bazę.')
//     ref.current.close()
// }


function ConfigurationBuilderPage() {
    const { id } = useParams()
    const build = builds.find((build) => build.id.toString() === id)

    if (!build && id !== "new") {
        return (
            <section className="order-details-page">
                <div className="page-heading">
                    <h1>Komplektacijos peržiūra</h1>
                </div>

                <div className="order-details-empty">
                    <h2>Komplektacija nerasta</h2>
                    <p>Pasirinkta komplektacija neegzistuoja arba nebėra pasiekiama.</p>

                    <div className="order-cancel-actions">
                        <a href="/configurations" className="secondary-button">
                            Komplektacijos
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
        let total = 0
        if (id !== "new") {
            build.parts.map(part => total += +(part.price * part.quantity * (1 - part.discount * 0.01)).toFixed(2))
        }
        const [title, setTitle] = id === "new" ? 
            useState("") : useState(build.title);
        const [description, setDescription] = id === "new" ? 
            useState("") : useState(build.description);
        const [priceLimit, setPriceLimit] = id === "new" ?
            useState(0) : useState(build.price_limit);
        
        function HandleSave() {
            alert('Komplektacijos išsaugojimas bus galimas prijungus duomenų bazę.')
        }

        let tr_flag;
        tr_flag = 0;
        
        function HandleRowClick(_this){
            if (tr_flag === 0){
                location.replace("/catalog/" + id)
            }
        }

        function HandleDelete(id){
            tr_flag = 1;
            setTimeout(reset, 1000);
            alert('Kompiuterio dalies ištrynimas bus galimas prijungus duomenų bazę.')
            
        }
        
        function reset(){
            tr_flag=0;
        }
        
        function changeTitle(e) {
            var text = document.getElementById("changes-text");
            text.textContent = "Yra neišsaugotų pakeitimų";
            setTitle(e.target.value)
        }
        
        function changeDescription(e) {
            var text = document.getElementById("changes-text");
            text.textContent = "Yra neišsaugotų pakeitimų";
            setDescription(e.target.value)
        }
        
        function changePriceLimit(e) {
            var text = document.getElementById("changes-text");
            text.textContent = "Yra neišsaugotų pakeitimų";
            setPriceLimit(e.target.value)
        }
        
        function checkCompatibility() {
            var block = document.getElementById("compatibility-result-block");
            var text = document.getElementById("compatibility-result-text");
            text.textContent = "Visos kompiuterio dalys dera";
            text.style.color = "green"
            block.style.display = "block";
        }

        return (
            <section className="order-details-page">
                <div className="page-heading">
                    <h1>Komplektacijos kūrimas/redagavimas</h1>
                </div>

                <div className="orders-table-container">

                    <div className="order-details-empty">

                        <table className="orders-table">
                            <tbody>
                            <tr>
                                <td>Pavadinimas</td>
                                <td>
                                    <div className="payment-field">
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => changeTitle(e)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Aprašymas</td>
                                <td>
                                    <div className="payment-field">
                                        <textarea
                                            value={description}
                                            style={{height: "50px", border: "1px solid lightgray", borderRadius: "7px", fontSize: "14px"}}
                                            onChange={(e) => changeDescription(e)}
                                        />
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>Kainos limitas</td>
                                <td>
                                    <div className="payment-field" style={{width: "50%"}}>
                                        <input
                                            type="number"
                                            value={priceLimit}
                                            onChange={(e) => changePriceLimit(e)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <h3>Kompiuterio dalys</h3>
                        
                        <table className="orders-table" style={{marginBottom: "0px"}}>
                            <thead>
                                <tr>
                                    <th>Kompiuterio dalies pavadinimas</th>
                                    <th>Kiekis</th>
                                    <th>Kaina</th>
                                    <th>Nuolaida</th>
                                    <th>Kaina po nuolaidos</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                id !== "new" ? build.parts.map((part) => (
                                <tr key={part.id} onClick={() => HandleRowClick(part.id)}>
                                    <td>{part.name}</td>
                                    <td>{part.quantity}</td>
                                    <td>{part.price} €</td>
                                    <td style={{fontWeight: "normal", fontSize: "13px", color: "#465267"}}>{part.discount} %</td>
                                    <td>{+(part.price - part.price * part.discount * 0.01).toFixed(2)} €</td>
                                    <td style={{padding: "7px"}}><button className="order-details-link" onClick={() => HandleDelete(build.id)}>Ištrinti</button></td>
                                </tr>
                                )) : null
                            }
                            </tbody>
                        </table>

                        <a className="primary-button"
                                style={{marginBottom: "30px", marginLeft: "20px", marginTop: "10px"}}
                                href="/catalog"
                        >
                            Pridėti
                        </a>

                        <table className="orders-table">
                            <tbody>
                                <tr>
                                    <td>Bendra kaina ir kainos limitas</td>
                                    {
                                        total > priceLimit ?
                                        <td style={{color: "red"}}>{total} € / {priceLimit} €</td> : 
                                        <td style={{color: "green"}}>{total} € / {priceLimit} €</td>
                                    }
                                    
                                </tr>
                            </tbody>
                        </table>

                        <button className="primary-button"
                                style={{backgroundColor: "indigo"}}
                                onClick={checkCompatibility}>
                            Patikrinti suderinamumą
                        </button>

                        <div id="compatibility-result-block" style={{display: "none", marginTop: "15px"}}>
                            <p id="compatibility-result-text"/>
                        </div>

                        <div id="changes_block" style={{marginTop: "25px"}}>
                            <p id="changes-text"/>
                        </div>
                        
                        <div style={{marginTop: "45px", marginBottom: "20px"}}>
                            <button className="primary-button"
                            onClick={HandleSave}>
                                Išsaugoti
                            </button>
                        </div>

                        <div className="order-cancel-actions">
                            <a href="/configurations" className="secondary-button">
                                Komplektacijų sąrašas
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

export default ConfigurationBuilderPage