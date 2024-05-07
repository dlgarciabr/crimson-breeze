"use client";

import { useEffect, useState } from "react";
import { getProducts } from '@/app/menu/actions'

export default function Menu() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async ()=>{
      const result = await getProducts();
      setProducts(result);
    })();
  },[])
  
  return (
    <div>
      {products.map(product => (
        <div key={product.product_id}>
          <div>{product.description}</div>
          <div>{product.price}</div>
        </div>
        ))
      }
    </div>
  )
}
