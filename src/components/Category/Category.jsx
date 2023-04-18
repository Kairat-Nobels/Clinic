import styles from './category.module.css'

function Category({ obj })
{
    return (
        <div className={styles.category}>
            <p><span>{obj.name}</span></p>
            <p>цена: <span>{obj.price} сом</span></p>
        </div>
    )
}

export default Category