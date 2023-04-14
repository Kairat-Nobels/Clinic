import { useState } from "react"
import DeleteModal from "../DeleteModal/DeleteModal"


function Record({ data })
{
    const [modal, setModal] = useState(false)

    return (
        <div>
            <p>name: {data.name}</p>
            <p>phone: {data.phone}</p>
            <p>Услуга: {data.service}</p>
            <p>День: {data.date}</p>
            <p>Время: {data.time}</p>
            <button onClick={e => setModal(true)}>Delete</button>
            <p>.......................</p>
            <br />
            {
                modal && <DeleteModal setModal={setModal} id={data.id} />
            }
        </div>
    )
}

export default Record