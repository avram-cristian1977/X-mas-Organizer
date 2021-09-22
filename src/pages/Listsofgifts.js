
import { useEffect, useState } from 'react'
import List from '../components/List'
import './ListsOfGifts.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import Carousel from 'react-elastic-carousel';

const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1000, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
  { width: 1600, itemsToShow: 3 }
]



const ListsOfGifts = () => {

  const [list, setLists] = useState([])
  const [enteredFriendName, setEnteredFriendName] = useState("")
  const [enteredBudget, setEnteredBudget] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const localId = useSelector(state => state.auth.localId)
  const [collectingList, setCollectingList] = useState([])
  const [globalList, setGlobalList] = useState([])
  const [saveMsg,setSaveMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  


  useEffect(() => {
    itemsColector()
  }, [])
  // 
  useEffect(()=>{
    const dataFromfb = db.collection("users").doc(localId).collection("lists").doc('listReference').get()
    .then (response => setLists(response.data().list))
    .catch(err => {
      console.log(err)
    })
  }, [])


  


  const db = firebase.firestore()
  const listRef = db.collection("users").doc(localId).collection("lists").doc('listReference')

 



  const getRandomUID = () => {
    return Math.floor(Math.random() * 10000)
  }
  const listsCreatorHandler = (ev) => {
    ev.preventDefault()
    if (enteredFriendName.length === 0) {
      setErrorMessage("Please enter the friend name.")
      return
    }
    if (enteredBudget <= 0 || !enteredBudget) {
      setErrorMessage("Please enter a valid budget.")
      return
    }

    setLists([...list, {
      id: getRandomUID(),
      friendName: enteredFriendName,
      budget: enteredBudget,
      listsFromListJs: []
    }
    ])

    setEnteredFriendName("")
    setEnteredBudget(0)

  }

  const saveLists = (ev) => {
    ev.preventDefault()
    setIsLoading(true)
    console.log("fire save project");
    listRef.set({
      list
    }).then(response =>{
      setIsLoading(false)
      setSaveMsg("plan saved")
    })
  }


  const deleteListHandler = (id) => {
    setLists(list.filter(list => list.id !== id))
  }

  const itemsColector = (listOfGifts) => {
    if(!listOfGifts){
      return
    }
    
    list.forEach(l => {
      if (l.id == listOfGifts.id) {
       l.listsFromListJs = listOfGifts 
      }
    })
    setLists(list);
    console.log(list);
  }

console.log("collectingList", collectingList);
console.log("globalList", globalList);


const expenseHandler = (expense) => {
  if(!expense){
    return
  }
  console.log("expenses", expense)
  console.log("fire expenses")
  
}


  return <><div className="listsCreatorFormContainer">
 
    <div className="createFormWrapper">
      <form>
        <label >Create a list for : </label>
        <input value={enteredFriendName} type="text" onChange={(ev) => setEnteredFriendName(ev.target.value)} />
        <label>Set your budget  : </label>
        <input value={enteredBudget} type="number" onChange={(ev) => setEnteredBudget(ev.target.value)} />
        <button className="createListButton" onClick={listsCreatorHandler}>Create new list</button>
        <p className="errorMsg">{errorMessage}</p>
        {!isLoading && <p className="sendMsg">{saveMsg}</p>}
        {isLoading && <p className="sendMsg">saving...</p>}
        <button className="saveProjBtn" onClick={saveLists}>Save your plan!</button>
      </form>
    </div>
  </div>
    <div className="horizontalLine4"></div>
    {list.length !== 0 && <div className="newListsWrapper">
      <div className="paddingWrapper">
        <Carousel
          breakPoints={breakpoints}

        >
          {list.map(list => <List
          onSaveTotalExpense = {expenseHandler}
          listsFromListJs={list.listsFromListJs}
            listFromFB = {list}
            motherId={list.id}
            onSaveListItems={itemsColector}
            key={list.id} onDeleteList={() => deleteListHandler(list.id)}
            friendName={list.friendName} budget={list.budget} />)}
        </Carousel>
      </div>
    </div>}



  </>
}

export default ListsOfGifts;
