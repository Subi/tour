import Image from "next/image"
import Star from '../../../public/404.gif'
import styles from './gallery.module.css';

export default function Gallery() {
    return (
        <section id={styles.placeholder}>
            <Image src={Star} alt="404" height={200} width={200}/>
            <span>Come back soon !</span>
        </section>
    )
}