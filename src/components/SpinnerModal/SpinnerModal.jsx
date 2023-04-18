import { Watch } from 'react-loader-spinner'
import styles from './spinner.module.css'

function SpinnerModal()
{
    return (
        <div className={styles.loading}>
            <Watch
                height="60"
                width="60"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default SpinnerModal