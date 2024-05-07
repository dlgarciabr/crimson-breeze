"use client";

import Image from "next/image";
import pg from 'pg';
import { useEffect, useState } from "react";
import { get } from '@/app/product/actions'

interface Product {
  product_id: number;
  description: string;
  price: number;
}

export default function Product() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async ()=>{
      const result = await get();
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
