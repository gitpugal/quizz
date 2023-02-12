import React from "react"
import Ques from "./Ques"
import { Loader } from "./Loader.js"
import { ThreeDots } from "react-loader-spinner"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
// import "nanoid"
export default function App(){
    const [isGameOn, setIsGameOn] = React.useState(false)
    const [data, setData] = React.useState([])
    const [isAll, setisAll] = React.useState(false)
    const [game, setIsGame] = React.useState(false)
    const [count, setCount] = React.useState(0)

    const { width } = useWindowSize()
    let height

    
    
    const fetchData = () => {
    return fetch("https://opentdb.com/api.php?amount=5")
          .then((response) => response.json())
          .then((data) => data.results.map(res => {
              let arr = res.incorrect_answers.map(ans => {return {ans: ans, isopted: false}});

 
                
              

              arr.push({ans: res.correct_answer, isopted: false})
              arr =  arr.sort( ()=>Math.random()-0.5 );
            setData(da => [...da, {question: res.question, selected: "hi", id: res.question, options:  arr, correct:res.correct_answer}] )
          }));

          
  }

//   React.useEffect(() => {
//     fetchData();
    
//   },[])

function display(){
    data.forEach(dat => {
                dat.options.forEach(op => {
                    if(op.ans == dat.correct && op.isopted){
                        setCount(prev =>prev+1)
                    }
                })
            })
            setIsGame(true)
}
  
function checkAns(){
      if(data.every(dat => dat.options.some(da => da.isopted))){
            setisAll(true)
            display()
        }
        else{
            window.alert("please answer all questions...")
        }
  }
  
//   console.log(data)
    
    function startGame(){
        setIsGameOn(true)
        setData([])
        setCount(0)
        setIsGame(false)
        setisAll(false)
        fetchData();
    }

    // function startGame(){
    // console.log(fetchData)
    // }
    function selectToggler(ques, optid){
        
        setData(data.map(dat => {
            
            if(dat.question == ques){
                let sel;
                dat.options.map(o => {
                    if(o.isopted){
                        console.log(o+" "+o.ans)
                        sel= o.ans
                    }
                })
                return {...dat, options:dat.options.map(da => {
                    if(da.ans == optid){
                        if(dat.options.some(op => op.isopted==true && op.ans != optid)){
                            return da
                        }
                        return {...da, isopted:!da.isopted}
                    }else{
                        return da
                    }
                })}
            }else{
                return dat
            }
        }))
        
          
        // data.every(dat => dat.options.some(da => da.isopted))
        
    }
    


    return(
        <div className="app">
          <div className="topCircle">

          </div>
          {game && <Confetti
      width={width}
      height={2000}
      gravity={.2}
    />}
            {!isGameOn ? (
            <div className="startScreen">
              
                <h1>Quizz</h1>
                <p>Get your brains sharper</p>
                <button onClick={startGame}>Start quiz</button>
            </div>
            )
            :
            <div className="ques">
              {isGameOn && data.length != 0 &&<h1 className="title">Quizz</h1>}
               { data.map(dat => 
                <Ques 
                options={dat.options}
                ques={dat.question}
                correct_answer={dat.correct}
                selectToggler={selectToggler}
                submitted={isAll}
                id={dat.id}
                />
                
                )}
            </div>
            }
            {data.length == 0  && isGameOn && <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#293264" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />}
 {/* {isGameOn && data.length != 0 && setHeight()} */}
           {isGameOn && data.length != 0 &&<button onClick={game?startGame:checkAns}>{game?"Restart Game":"Check Answer"}</button>}
           {/* {data.length != 0  && isGameOn && <button onClick={checkAns}>Check Answer</button>} */}
            {game && <p className="result">You've have Scored {count} out of 5...</p>}
            <div className="bottomCicle">

          </div>
        </div>
    )
}