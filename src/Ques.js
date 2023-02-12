import React from "react"

export default function Ques(props){
    const [isop, setisop] = React.useState(false)
    const [style, setStyle] = React.useState({})
    // (props.submitted?(op.isopted?(op.ans==props.correct_answer?c+=1:"red"):(op.ans==props.correct_answer?"green":"white")):(op.isopted ? "green": "white"))
    
    return (
        <div className="eachQues">
             <p className="questions">{props.ques}</p>
             <div className="optDiv">
               {props.options.map(op => <p className="opts" style={{backgroundColor:(props.submitted?(op.isopted?(op.ans==props.correct_answer?"94D7A8":"#F8BCBC"):(op.ans==props.correct_answer?"#94D7A8":"white")):(op.isopted ? "#94D7A8": "white"))}} onClick={() => {
                   setisop(op.isopted)
                   props.selectToggler(props.ques, op.ans)
                   }}>{op.ans}</p>)}
             </div>
             <hr />
        </div>
    )
}