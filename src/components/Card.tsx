import { IProduct } from "@/interfaces";
import React from "react";
// "id": 1,
//       "name": "iPhone 16 PRO",
//       "description": "Experience power and elegance with the iPhone 11: capture stunning moments with its dual-camera system, enjoy exceptional performance, and immerse yourself in a brilliant Liquid Retina display. Discover a world of possibilities in the palm of your hand!",
//       "price": 699,
//       "stock": 10,
//       "image": "https://www.apple.com/la/iphone-16-pro/images/overview/product-viewer/iphone-pro/all_colors__fdpduog7urm2_large_2x.jpg",
//       "categoryId": 1


function Card({ name, price, stock, image }: IProduct) {
    return(
        <div className="py-5">
            <img
            width={500} height={500} src={image} alt={"image of the product" + name} />
            

            <h2>{name}</h2>
            <p>price {price}</p>
            <p>stock {stock}</p>
            
            
        </div>
    )
}

export default Card;