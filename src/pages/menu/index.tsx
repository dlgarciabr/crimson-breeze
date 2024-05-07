import { useEffect, useState } from "react";

interface Product {
  id: string;
  description: string;
  price: number;
}

const convertRowToProduct = (row: any): Product =>{
  return {
    id: row[0],
    description: row[4],
    price: row[5]
  }
}

const MenuPage = () => {

  const [products, setProduct] = useState<Product[]>([]);

  const loadItems = async () => {
    const response = await fetch(`${location.origin}/api/product`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    setProduct(result.map((item:any) => convertRowToProduct(item)));
  };

  useEffect(()=>{
    loadItems()
  },[])

  return (
  <div>
    produtos
    {
      products.map(product => (
        <div key={product.id}>
          <div>{product.description}</div>
          <div>{product.price}</div>
        </div>
      ))
    }
  </div>
)
};

export default MenuPage;