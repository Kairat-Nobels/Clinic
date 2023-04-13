import React from 'react'

function Review({ data })
{
    return (
        <div>
            <p>Автор оставленного отзыва: {data.name}</p>
            <p>Отзыв: <br />{data.comment}</p>
            <p>---------------------------</p>
            <br />
        </div>
    )
}

export default Review