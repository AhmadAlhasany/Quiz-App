import React from "react"
import Question from "./Question.js"


function ran (){
  let arr = [];
  for(let i = 0; i < 5; i++)
  arr.push(Math.floor(Math.random() * 5) + (i*6))
  return arr;
}

function App() {
  const [game, setGame] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [obj, setObj] = React.useState([]);
  const [ques, setQues] = React.useState([]);
  const [score, setScore] = React.useState(0)
  

  React.useEffect(() =>{
      fetch("https://opentdb.com/api.php?amount=30&type=multiple")
      .then(res => res.json())
      .then(data => setObj(data.results))
      .catch((error) =>{
        console.error(error);
      })
  } ,[])
  
  React.useEffect( ()=>{
  let arr1 = ran(), arr2= [];
  for(let i = 0; i < 5; i++){
      arr2.push(obj[arr1[i]])
  setQues(arr2)}
}, [game, obj])


  function start(){
    setGame(true);
  }
  return (
     game ? (
    <main>
      <div className = "card">
        <h1 className = "Title">Quiz Generator</h1>
        {ques.map((ele, index) => {
          return <Question key = {index} id = {index} obj = {ele} status = {status} setScore = {setScore}/>           
        })}
        {!status ? <button className="sub" onClick = {() => setStatus(true)}>Submit</button> 
        :  (<>
        <p className="con">Congratulations !! <br></br>
        You have answered {score} / 5 questions correctly.</p>
        <button className="re" onClick= {() => { setStatus(false); setGame(false); setScore(0)}}>Retake the test</button>
        </>)}
      </div>
    </main>
    )
    :
    (
    <main>
      <div className="card-intro">
        <h1 className = "Title"> Quiz Generator </h1>
        <div className = "intro">
          <strong>Are you ready to challenge yourself ?</strong>
          <p>
            This is a quick quiz to test your knowledge in various fields.
            You will be able to see the correct answers once you submit yours. <br></br><br></br><br></br>
          </p>
        </div>
        <button disabled = {!ques[0]} onClick = {start}> Start </button>
      </div>
    </main>
    )
  );

}

export default App;
