

function Category({obj}) {
    return (
        <div>
            <p>{obj.name}  Цена: <span>{obj.price} сом</span></p>
        </div>
    )
}

export default Category