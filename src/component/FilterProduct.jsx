import { useEffect, useState } from 'react';

export default function FilterProduct() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentSelectcategory, setCurrentCategory] = useState('');
  const [filterItem, setFilterItem] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const apiResponse = await fetch('https://dummyjson.com/products');
      const result = await apiResponse.json();
      if (result && result.products && result.products.length) {
        setProducts(result.products);
        setFilterItem(result.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const cpyproduct = [...products];
    setFilterItem(
      currentSelectcategory !== ''
        ? cpyproduct.filter(
            (productItem) =>
              productItem.category.toLowerCase() ===
              currentSelectcategory.toLowerCase()
          )
        : cpyproduct
    );
  }, [currentSelectcategory, products]);

  const uniqueCategories =
    products && products.length > 0
      ? [...new Set(products.map((productItem) => productItem.category))]
      : [];

  if (loading) {
    return <h1 className="loading">Fetching the products! Please wait...</h1>;
  }

  return (
    <div className="filter-products-container">
      <h1 className="main-title">Filter Products</h1>

      <div className="filter-categories-container">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setCurrentCategory(
                currentSelectcategory !== '' &&
                currentSelectcategory === category
                  ? ''
                  : category
              )
            }
            className={`filter-btn ${
              currentSelectcategory === category ? 'active' : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="list-of-products">
        {filterItem &&
          filterItem.length > 0 &&
          filterItem.map((productItem) => (
            <li key={productItem.id} className="product-card">
              <p className="product-title">{productItem.title}</p>
              <button className="category-btn">{productItem.category}</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
