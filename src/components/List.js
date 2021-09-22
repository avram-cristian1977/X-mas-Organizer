import { useReducer, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import './List.css'

const itemsReducer = (state, action) => {
  
  switch (action.type) {
    case "add":
      return [...state, {
        id: action.id ?? Date.now(),
        title: action.title,
        price: action.price,
        isBought: false,
        isFound: false,
        isSent: false
      }]
    case "delete":
      return state.filter(item => item.id !== action.payload)
    case "isFound": {
      return state.map((item) => {
        if (item.id == action.payload) {
          return { ...item, isFound: !item.isFound }
        }
        return item
      })
    }
    case "isBought": {
      return state.map((item) => {
        if (item.id == action.payload) {
          return { ...item, isBought: !item.isBought }
        }
        return item
      })
    }
    case "isSent": {
      return state.map((item) => {
        if (item.id == action.payload) {
          return { ...item, isSent: !item.isSent }
        }
        return item
      })
    }
    default:
      return state
  }
}

const List = (props) => {

  const [items, dispatch] = useReducer(itemsReducer, [])
  const [item, setItem] = useState("")
  const [price, setPrice] = useState(0)
  const [sum, setSum] = useState(0)

useEffect(()=>{
  
  props.listsFromListJs.forEach(element => {
    dispatch({type:"add", title:element.title, price: element.price, id: element.id})
    if (element.isBought)  dispatch({type:'isBought', payload: element.id}) 
    if (element.isFound) dispatch({type:'isFound', payload: element.id})
    if (element.isSent) dispatch({type:'isSent', payload: element.id})
  });
},[])


  useEffect(() => {
    listSum()
    itemsListHanlder()
  }, [items])

  const deteleListHandler = () => {
    props.onDeleteList()
  }

  const addHandler = () => {
    if (!item || !price) {
      return
    }
    dispatch({ type: "add", title: item, price: price })
 
    setPrice("")
    setItem("")
  }

  const listSum = () => {
    let s = 0;
    for (let i = 0; i < items.length; i++) {
      s += parseInt(items[i].price)
    }
    setSum(s)
  }
  
  const itemsListHanlder = () => {
    
    items['id'] = props.motherId; 
    props.onSaveListItems(items)
    
  }
  

  return <div className="listWrapper">
    {/* NAME AND BUDGET */}
    <div className="listHead">
      <p className="friendNameHead">{props.friendName}'s gifts</p>
      <p className="bugdetValueheadBudget"> Budget {props.budget}&euro;</p>
      {/* <button title="save this list" className="saveListItemBtn" ><i className="fas fa-save"></i></button> */}
      <button title="delete this list" className="delListBtn" onClick={() => deteleListHandler()}>  <i className="fas fa-trash-alt"></i></button>
    </div>
    {/* INPUT ITEM AND PRICE */}
    <div className="itemsInput">
      <input value={item} type="text" onChange={(ev) => setItem(ev.target.value)} placeholder="item required" />
      <input value={price} type="number" onChange={(ev) => setPrice(ev.target.value)} placeholder="price required" />
      <button title="add item to list" className="addItemBtn" onClick={() => addHandler()}><i className="fas fa-pen-nib"></i></button>
    </div>
    <div className="ballance">
      <button title="left to spent" className="ballanceBtn" > <i className="fas fa-balance-scale-right"></i></button>
      <span className={(props.budget - sum) < 0 ? "negativeBallance" : ""}> <span className="ballanceValue">{(props.budget - sum)}&euro;</span> </span>
    </div>
    {/* TABLE CONTENT */}
    <table>
      {items.length !== 0 && <tr>
        <th className="itemTitleTh" title="gift"><i className="fas fa-gifts"></i></th>
        <th className="itemPriceTh" title="price"> <i className="fas fa-euro-sign"></i></th>
        <th className="itemStateTh" title="founded it!"><i className="fas fa-search"></i></th>
        <th className="itemStateTh" title="bought it!"><i className="fas fa-money-bill-wave"></i></th>
        <th className="itemStateTh" title="sent it!"><i className="fas fa-truck"></i></th>
        <th className="itemStateTh" title="delete this item"> <i className="fas fa-exclamation-circle"></i></th>
      </tr>}
      {items.map(item => <tr key={item.id}>
        <td className="itemTitle">
          {item.title}
        </td>
        <td className="itemPrice">
          {item.price}
        </td>
        <td >
          <input className="stateTd" type="checkbox"
            defaultChecked={item.isFound}
            onChange={() => dispatch({ type: "isFound", payload: item.id })} />
        </td>
        <td >
          <input className="stateTd" type="checkbox"
            defaultChecked={item.isBought}
            onChange={() => dispatch({ type: "isBought", payload: item.id })} />
        </td>
        <td >
          <input className="stateTd" type="checkbox"
            defaultChecked={item.isSent}
            onChange={() => dispatch({ type: "isSent", payload: item.id })} />
        </td>
        <td>
          <button className="delItemBtn" onClick={() => dispatch({ type: "delete", payload: item.id })}><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>)}
    </table>
  </div>

}

export default List;