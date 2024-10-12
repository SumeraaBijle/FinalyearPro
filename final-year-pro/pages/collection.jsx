import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Collection.module.css';

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: '$25',
        image: '/images/product1.jpg', // Ensure the image path is correct
    },
    {
        id: 2,
        name: 'Product 2',
        price: '$30',
        image: '/images/product2.jpg',
    },
    {
        id: 3,
        name: 'Product 3',
        price: '$45',
        image: '/images/product3.jpg',
    },
    {
        id: 4,
        name: 'Product 4',
        price: '$60',
        image: '/images/product4.jpg',
    },
];

const Collection = () => {
    return (
        <>
            <Head>
                <title>Ambika novelty</title>
                <meta name="description" content="Shop our latest collection of products." />
            </Head>
            <header className={styles.header}>
                <h1>Our Collection</h1>
            </header>
            <main className={styles.container}>
                <div className={styles.grid}>
                    {products.map(product => (
                        <div key={product.id} className={styles.card}>
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                width={300} 
                                height={300} 
                                className={styles.image}
                            />
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.productPrice}>{product.price}</p>
                            <button className={styles.addButton}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Collection;
