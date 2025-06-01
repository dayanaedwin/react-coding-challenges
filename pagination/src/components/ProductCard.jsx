export const ProductCard = ({img, name}) => {
    return (
        <div className="product-card">
            <img src={img} alt={name}></img>
            <h3>{name}</h3>
        </div>
    )
}