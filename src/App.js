import React, { Component } from 'react';
import './App.css';
import Pantalla from './components/Pantalla';
import Botones from "./components/Botones";

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: "",
            contador:0,
            
        }
    }

    
    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }
        else if (button === "H"){
        
        var hist = document.getElementById("localstorage")
        for(let i =0;i < localStorage.length;i++)
            {
            hist.innerHTML+=
            `   <ul>
                    <li>${localStorage.getItem(`Operacion ${i}`)}</li>
                </ul>
            `
            }
        }
        
        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };
    
    
    calculate = () => {
        var checkResult = ''
        
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        else {
            checkResult = this.state.result
        }

        try {
          
            this.setState({
                // eslint-disable-next-line
                result: (eval(checkResult) || "" ) + ""
               
            })
            if(this.state.result !== 0){
                this.setState({
                    contador: this.state.contador + 1
                  });
                localStorage.setItem('Operacion ' + this.state.contador, this.state.result)
            }
            
             
        } catch (e) {
            this.setState({
                result: "Entrada Invalida"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };
    
    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };
    
    

    render() {
        return (
            <div>
                <div className="calculator-body">
                    <h1>Calculadora Web</h1>
                    <Pantalla result={this.state.result}/>
                    <Botones onClick={this.onClick}/>
                    
                  
                </div>
            </div>
        );
    }
}

export default App;