import React from 'react'

import Card from './Card'
import { getProductsDB } from '@/helpers/Products.helper'
import Link from 'next/link';
import { IBM_Plex_Mono } from "next/font/google";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });


const CardList = async () => {
  const products = await getProductsDB();
  return (
    <div className={plexMono.className}>

    <div className='sm:flex sm:flex-wrap md:grid grid-cols-2 items-center gap-4 justify-center'>
        {
          
            products && 
            products?.map((product) => {
              return(
                <Link key={product.id} href={`/product/${product.id}`}>
                    <Card key={product.id} {...product}  />
                  </Link>
                )
              })
              
              
            }
    </div>
            </div>
  )
}

export default CardList