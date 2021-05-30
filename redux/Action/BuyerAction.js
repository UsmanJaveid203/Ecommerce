export const GET_DATA = "GET_DATA";
export const DELETE_DATA = "DELETE_DATA";


export const SellerData = (user_id) => {
  return function (dispatch) {
    fetch(`http://localhost:3000/api/buy/SellerProduct/${user_id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: GET_DATA,
          infor: result.data,
          payload: result
        })
      })
      .catch(err => console.log(err))
  }
}

export const BuyerData = (user_id) => {
  return function (dispatch) {
    fetch(`http://localhost:3000/api/buy/BuyerProduct/${user_id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: GET_DATA,
          infor: result.data,
          payload: result
        })
      })
      .catch(err => console.log(err))
  }
}

export const UpdateData = (user_id, val) => {
  return function (dispatch) {
    fetch(`http://localhost:3000/api/buy/UpdateSellerProduct/${user_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        val: val
      })
    })
      .then(res => res.json())
      .then(result => {
        dispatch(SellerData(result.seller_id))
      })
      .catch(err => console.log(err))
  }
}


export const DeleteData = (pro_id, seller_id) => {
  return function (dispatch) {
    fetch(`http://localhost:3000/api/buy/DeleteSellerProduct/${pro_id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        dispatch(SellerData(seller_id))
      })
      .catch(err => console.log(err))
  }
}