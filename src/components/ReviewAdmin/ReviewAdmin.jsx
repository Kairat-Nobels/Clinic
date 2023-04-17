import { useState } from "react"
import DeleteModal from "../DeleteModal/DeleteModal"

function ReviewAdmin({ data })
{
    const [modal, setModal] = useState(false)

    return (
        <div>
            <p>Автор оставленного отзыва: {data.name}</p>
            <p>Телефон: {data.phone}</p>
            <p>Связаться: <a href={`tel:+996${data.phone}`}>+996{data.phone}</a></p>
            <p>Отзыв: <br />{data.comment}</p>
            <button onClick={e => setModal(true)}>Удалить</button>
            <p>.......................</p>
            <br />
            {
                modal && <DeleteModal setModal={setModal} id={data.id} />
            }
        </div>
    )
}

export default ReviewAdmin