
import { getProductsDBbyId } from '@/helpers/Products.helper'
import ProductDetail from '@/views/ProductDetail'
import React from 'react'

const Detail = async({
  params,
}: { params: Promise<{productId:string}> 
}) => {
  const ProductID =  (await params).productId
  const product = await getProductsDBbyId(ProductID);
  
  
  return (
    <div>
      <ProductDetail {...product}/> </div>
  
  )
}

export default Detail