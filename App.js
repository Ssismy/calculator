function App(){
    const[result,setResult]=React.useState(0);
    const[lastPressed,setLastPressed]=React.useState("");
  
    const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    const ops = [ '/', '*', '-', '+'];
    const ids = {
      7: 'seven', 
      8: 'eight', 
      9: 'nine', 
      4: 'four', 
      5: 'five', 
      6: 'six', 
      1: 'one', 
      2: 'two', 
      3: 'three', 
      0: 'zero',
      '/': 'divide', 
      '*': 'multiply', 
      '-': 'subtract', 
      '+': 'add'
    }
   
  
  const handleInput=(e)=>{
    const{innerText}=e.target;
    console.log(innerText);
    console.log(result);
  
    switch(innerText){
      case "=":
        {
          const evaluated=eval(result);
          setResult(evaluated);
          break;
          }
      
      case "AC":{
        setResult(0);
        break;
      }
     
      case ".":{
          const splitted=result.split(/[\+\-\*\/]/);
          const last=splitted.slice(-1)[0];
          if(!last.includes(".")){
            setResult(result+".")
           }
           break;
         }
        
      default:{
        
        if(ops.includes(innerText)){
          if(ops.includes(lastPressed)&&innerText!=="-"){
            const lastNumberinx=result.split("").reverse().findIndex(char=>char!==""&&nums.includes(+char));
            setResult(result.slice(0,result.length-lastNumberinx)+innerText)
          }
          else{
            setResult(pre=>pre+innerText);
          }
        }
        else{
          setResult((result==0)?innerText:((pre)=>pre+innerText));
        }
        break;
      }
      }
      setLastPressed(innerText);  
    }
  
   return (
     <div className="container">
      <div className="display" id="display">
        {result}
      </div>
      <div className="num-container">
       <button id="clear" onClick={handleInput} className="grey ac big-h">AC</button>
       {nums.map((num)=>(
        <button key={num} onClick={handleInput} id={ids[num]} className={`dark-grey ${num===0&&"big-h"}`}>{num}</button>
       ))}
       <button id="decimal" onClick={handleInput} className="grey">.</button>
       </div>
       <div className="ops-container">
        {ops.map((op)=>(
          <button key={op} onClick={handleInput} id={ids[op] } className="orange">{op}</button>
        ))}
        <button id="equals" onClick={handleInput} className="orange">=</button>
       </div>
       
     </div>
   
   )
  }
  
  
  
  ReactDOM.render(<App/>,document.getElementById("app"))