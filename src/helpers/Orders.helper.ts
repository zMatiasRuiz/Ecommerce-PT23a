import Swal from "sweetalert2";


const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(products: number[], token: string) {
  try {
    const response = await fetch(`${APIURL}/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        products,
      }),
    });
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getOrder(token: string) {
  try {
    const response = await fetch(`${APIURL}/users/orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    Swal.fire("This is your orders")
    return response.json();
  } catch (error: any) {
    Swal.fire("An error occurred and your purchase was not registered");
    throw new Error(error);
  }
}


