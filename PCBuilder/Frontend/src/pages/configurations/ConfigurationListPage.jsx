import { useRef } from 'react';
import Popup from 'reactjs-popup';

const builds = [
    {
        id: '1',
        title: 'Žaidimų kompiuteris',
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
    },
]

function ConfigurationListPage() {
    const ref = useRef();
    
    function HandleDelete(id) {
        alert('Komplektacijos ištrynimas bus galimas prijungus duomenų bazę.')
        ref.current.close()
    }
    
    return (
        <section className="orders-page">
            <div className="page-heading">
                <h1>Komplektacijos</h1>
            </div>
            
            <a className="primary-button"
               style={{margin: "15px"}}
               href="/configurations/new/build"
            >Kurti naują komplektaciją
            </a>

            <div className="orders-table-container">

                <table className="orders-table">
                    <thead>
                    <tr>
                        <th>Komplektacija</th>
                        <th>Pavadinimas</th>
                        <th>Kompiuterio dalys</th>
                        <th>Kaina</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {builds.map((build) => (
                        <tr key={build.id}>
                            <td>{build.id}</td>
                            <td>{build.title}</td>
                            <td>
                                <span className="order-components">
                                    {build.parts.map(part => part.name).slice(0, 3).join(', ') + '...'}
                                </span>
                            </td>
                            <td>{
                                build.parts.reduce((accumulator, currentValue) => 
                                    accumulator + (currentValue.price * currentValue.quantity * (1 - currentValue.discount * 0.01))
                                        , 0).toFixed(2)
                                } €
                            </td>
                            <td>
                                <a
                                    href={`/configurations/${build.id}/build`}
                                    className="order-details-link"
                                >
                                    Peržiūrėti/Redaguoti
                                </a>
                            </td>
                            <td>
                                <Popup ref={ref} trigger={<button className="danger-button">Ištrinti</button>} position="bottom center">
                                    <div className="cancel-popup">
                                        <center>
                                            <p>Ar tikrai norite ištrinti?</p>
                                            <button className="danger-button"
                                                    style={{margin: "5px"}} 
                                                    onClick={() => HandleDelete(build.id)}>
                                                Ištrinti
                                            </button>
                                            <button className="secondary-button"
                                                    onClick={() => ref.current.close()}>
                                                Atšaukti
                                            </button>
                                        </center>
                                    </div>
                                </Popup>
                            </td>
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

export default ConfigurationListPage