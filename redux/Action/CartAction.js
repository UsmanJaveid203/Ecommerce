export const SENDING_DATA = "SENDING_DATA";
export const GET_DATA = "GET_DATA";
export const UPDATE_DATA = "UPDATE_DATA";
export const REMOVE_DATA = "REMOVE_DATA";
export const DELETE_DATA = "DELETE_DATA";

// import cookie from 'js-cookie'; 

export const DataIntoCookie = (buy_product) => {
  return function (dispatch) {
    fetch(`https://ecommerce-203.herokuapp.com/api/cart/product/add_to_cart`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(buy_product)
    })
    .then(res => res.json())
    .then(data => {
      const totalQty = data.totalQty;
      const totalPrise = data.totalPrise;
      const items =data.items;
      dispatch({
        type: SENDING_DATA,
        length: totalQty,
        price: totalPrise,
        payload: items
      })
    })
    .catch(err => console.log(err))
  }
}

export const GetFromCookie = () => {
  return function (dispatch) {
    fetch(`https://ecommerce-203.herokuapp.com/api/cart/product/get_from_cart`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const totalQty = data.totalQty;
        const totalPrise = data.totalPrise;
        const items =data.items;
        dispatch({
          type: GET_DATA,
          length: totalQty,
          price: totalPrise,
          payload: items
        })
      })
      .catch(err => console.log(err))
  }
}


export const RemoveFromCookie = (index) => {
    return function (dispatch) {
      fetch(`https://ecommerce-203.herokuapp.com/api/cart/removeData/${index}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        const totalQty = data.totalQty;
        const totalPrise = data.totalPrise;
        const items =data.items;
        dispatch({
          type: REMOVE_DATA,
          length: totalQty,
          price: totalPrise,
          payload: items
        })
      })
      .catch(err => console.log(err))
    }
}


export const UpdateCounting = (userInfor) => {
  return function (dispatch) {
    fetch(`https://ecommerce-203.herokuapp.com/api/cart/product/update_cart/${userInfor.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfor)
    })
    .then(res => res.json())
    .then(data => {
      const totalQty = data.totalQty;
      const totalPrise = data.totalPrise;
      const items =data.items;
      dispatch({
        type: UPDATE_DATA,
        length: totalQty,
        price: totalPrise,
        payload: items
      })
    })
    .catch(err => console.log(err))
  }
}


export const DeleteCartData = (user_id) => {
  return function (dispatch) {
    fetch(`https://ecommerce-203.herokuapp.com/api/buy/BuyProduct/${user_id}`, {
            method: 'POST'
        })
    .then(res => res.json())
    .then(data => {
      const totalQty = 0;
      const totalPrise = 0;
      const items =[];
      dispatch({
        type: DELETE_DATA,
        length: totalQty,
        price: totalPrise,
        payload: items
      })
    })
    .catch(err => console.log(err))
  }
}