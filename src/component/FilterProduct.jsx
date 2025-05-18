import { useEffect, useState } from 'react'

export default function FilterProduct() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentSelectcategory, setCurrentCategory] = useState("");
    const [filterItem, setFilterItem] = useState([]);
    async function fetchProducts() {
        try {
            setLoading(true);
            const apiResponse = await fetch('https://dummyjson.com/products', {
                method: 'GET'
            })
            const result = await apiResponse.json();
            console.log(result);
            if (result && result.products && result.products.length) {
                setLoading(false);
                setProducts(result.products);
                setFilterItem(result.products);
            }
        }
        catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        fetchProducts();
    }, []);
    
    useEffect(()=>{
        const  cpyproduct =  [...products];
        setFilterItem(
            currentSelectcategory !== '' ? 
             cpyproduct.filter(productItem=> productItem.category.toLowerCase() === currentSelectcategory.toLowerCase() )
            : cpyproduct
        )
    } ,[currentSelectcategory,products])
    console.log(currentSelectcategory);
    const uniqueCategories = products && products.length > 0 ?
        [...new Set(products.map((productItem) => productItem.category))]
        : [];
        console.log("Unique",uniqueCategories);
        if (loading) {
            return <h1>Fetching the products ! Please Wait </h1>
        }
    return (
        <div className="filter-products-container">
            <h1>Filter Product</h1>
            <div className='filter-categories-container'>
                {uniqueCategories.map((uniqueCategoryItem) =>(
                    <button onClick={() => setCurrentCategory(currentSelectcategory !== '' &&  currentSelectcategory === uniqueCategoryItem?  '' : uniqueCategoryItem )}
                     className={`${currentSelectcategory === uniqueCategoryItem ? 'active' : ''}`}
                   >
                    {uniqueCategoryItem}
                    </button>
                ))}
            </div>
            <ul className="list-of-products">
                {
                    filterItem && filterItem.length ?
                        filterItem.map(productItem => (
                              <li key={productItem.id}>
                            <p>{productItem.title}</p>
                            <button>{productItem.category}</button>
                        </li>))
                        : null
                }
            </ul>
        </div>
    )
}
