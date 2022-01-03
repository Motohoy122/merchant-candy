import styles from './Overview.module.css';

const Overview = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.company}>
                <h1>{props.company}</h1>
                <h4>Statement of Account</h4>
            </div>
            <div className={styles.totals}>
                <div>
                    <h3>${props.dueTotals.dueNowTotal.toFixed(2)}</h3>
                    <p>Due now</p>
                </div>
                <div className={styles.dueLater}>
                    <h3>${props.dueTotals.dueLaterTotal.toFixed(2)}</h3>
                    <p>Due later</p>
                </div>
            </div>
        </div>
    )
}

export default Overview;