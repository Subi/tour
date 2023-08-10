import styles from './how-to.module.css'


export default async function Guide(){
    return (
        <div id={styles.wrapper}>
            <div>
                <h1>Upload Standard Guide</h1>
                <p>Best shot as seeing your patched showcased</p>
            </div>
            <section>
                <h3>Requirements</h3>
                <p>In order to submit a patch you must be signed into discord before attempting to upload <br/> 
                    if not you will be met with an error message. 
                </p>
                <p></p>
            </section>
        </div>
    )
}