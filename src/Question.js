import React from "react"


// function customShuffle(array) {
//         let n = array.length;
//         for (let i = 0; i < n; i++) {
//           let j = Math.floor(Math.random() * (n - i)) + i;
//           [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
// }

function customShuffle(array) {
    let n = array.length;
    let copy = [...array];
    for (let i = 0; i < n; i++) {
      let j = Math.floor(Math.random() * (n - i)) + i;
     
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function clearBetween (str) {
    var regex = /&[^&;]*;/g;
    return str.replace (regex, "");
  }

  /* 
  The bug that made you almost quit programming is because
  when you were setting the answers in useEffect, you were 
  modifying answers (the original array) in customShuffle 
  instead of returning a new memory address with the new array !!
  It's not because the component is being remounted when a state in
  the parent component changes or anything like that !!
  */

export default function Question (props) {
    const [selected, setSelected] = React.useState([false, false, false, false]);
    const [answers,setAnswers] = React.useState([])
    const [last, setLast] = React.useState(4);


    React.useEffect(() => {
        setAnswers(customShuffle([
            [clearBetween(props.obj.incorrect_answers[1]), 'false'],
            [clearBetween(props.obj.incorrect_answers[0]), 'false'],
            [clearBetween(props.obj.incorrect_answers[2]), 'false'],
            [clearBetween(props.obj.correct_answer), "true"]
          ]))
    } , []);

    React.useEffect(() => {
        let i;
        for( i = 0; i < 4; i++)
            if(selected[i] === true)
                break;
        if(i !== 4 && answers[i][1] === 'true'){
            props.setScore(prev => prev + 1);
        }
        else if(last !== 4 && answers[last][1] === 'true')
            props.setScore(prev => prev - 1);
    }, [selected[0],selected[1],selected[2],selected[3]])

     function handleClick(e){
        let i;
        for( i = 0; i < 4; i++){
            if(selected[i] === true)
                break;
        }
        setLast(i);

         setSelected((pre) => {
             const index = e.target.id; 
             const newState = pre.map((ele, ind) => {
                 return ind != index ? false: ele}
             )
             newState[index] = !newState[index];               
             return newState;
          })

     }

     if(!answers.length)
         return null

     return (
         <div className="Question-container">
            <p>{clearBetween(props.obj.question)}</p>
            <div className="grid">
                <button id = {`0`} disabled = {props.status} onClick = {handleClick} checked = {selected[0]} className={`${answers[0][1] === 'true' && props.status ? "true " : props.status && selected[0] ? "false " : ""}${selected[0]? "selected" : ""}`}>{answers[0][0]}</button>
                <button id = {`1`} disabled = {props.status} onClick = {handleClick} checked = {selected[1]} className={`${answers[1][1] === 'true' && props.status ? "true " : props.status && selected[1] ? "false " : ""}${selected[1]? "selected" : ""}`}>{answers[1][0]}</button>
                <button id = {`2`} disabled = {props.status} onClick = {handleClick} checked = {selected[2]} className={`${answers[2][1] === 'true' && props.status ? "true " : props.status && selected[2] ? "false " : ""}${selected[2]? "selected" : ""}`}>{answers[2][0]}</button>
                <button id = {`3`} disabled = {props.status} onClick = {handleClick} checked = {selected[3]} className={`${answers[3][1] === 'true' && props.status ? "true " : props.status && selected[3] ? "false " : ""}${selected[3]? "selected" : ""}`}>{answers[3][0]}</button>
            </div>
        </div>
    )
}