import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PAGE_SIZE = 10;
    const totalProducts = products.length;
    const productPerPage = Math.ceil(totalProducts / PAGE_SIZE);
    const start = currentPage * PAGE_SIZE;

    const fetchProducts = async () => {
        const URL = 'https://dummyjson.com/products?limit=500';
        const res = await fetch(URL);
        const json = await res.json();
        setProducts(json.products);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(products.slice(start, PAGE_SIZE))

    return (
        <div className="container">
            <h3>Pagination</h3>
            <div className="pagination-container">
                {currentPage !== 0 && <button onClick={() => setCurrentPage(prev => prev - 1)}>⬅️</button>}
                {Array.from({ length: PAGE_SIZE }, (_, i) => i).map(item => (
                    <button className={`${currentPage === item ? 'selected-page' : ''}`} key={item } onClick={() => setCurrentPage(item)}>{item + 1}</button>
                ))}
                {currentPage !== PAGE_SIZE && <button onClick={() => setCurrentPage(prev => prev + 1)}>➡️</button>}
            </div>
            <div className="product-container">
                {products.slice(start, PAGE_SIZE + start).map(product => (
                    <ProductCard
                        key={product.id}
                        img={product.thumbnail}
                        name={product.title}
                    />
                ))}
            </div>
        </div>
    );
}