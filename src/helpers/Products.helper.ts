import { IProduct } from "@/interfaces";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProductsDB(): Promise<IProduct[]> {
    try {
        const response = await fetch(`${APIURL}/products`)
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const products : IProduct[] = await response.json();
        return products
        
    } catch (error: any) {
        console.error("Error fetching products:", error.message);
        throw new Error("Failed to fetch products. Please try again later.");
    }
}

export async function getProductsDBbyId(id: string): Promise<IProduct> {
    try {
        const products : IProduct[] = await getProductsDB();
        const productFilter = products.find((product) => product.id.toString() === id  )
        if(!productFilter) throw new Error("Product not found")
            return productFilter
    } catch (error: any) { 
        throw new Error(error)
    }
}