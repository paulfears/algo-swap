import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select';
import swapSideIcon from '../imgs/swapSide.png';
import downArrow from '../imgs/downArrow.png';
import logo from '../imgs/swapAlgoLogo.png';
import algoLogo from '../imgs/algoLogo.png';
import ethLogo from '../imgs/ethLogo.png';
import bnbLogo from '../imgs/bnbLogo.png';
import '../bggradient.css';

export default function Swap() {


    const options = [
        { value: 'ALGO', label: <div><img src={algoLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ALGO </div> },
        { value: 'ETH', label: <div><img src={ethLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ETH </div> },
        { value: 'BNB', label: <div><img src={bnbLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>BNB </div> }
    ];

    const [error, setError] = useState('');
    const [fromValue, setFrom] = useState(options[0]);
    const [toValue, setTo] = useState(options[1]);
    const [hoverSwap, setHoverSwap] = useState(false);
    const [outputAmount, setOutputAmount] = useState(0);
    const [connected, setConnected] = useState(false);
    
    const connect = async () => {
        let error = false;
        try{
            let connection = await window.ethereum.request({
                method: 'wallet_enable',
                params: [{
                    wallet_snap: { 'npm:algorand': {} },
                }]
            })
        console.log(connection);
        }catch(e){
            error = true;
            console.log('error', e);
        }
        if(error){
            alert("this app requires metamask flask at the current time");
            return "failed";
        }
        setConnected(true);
        document.getElementById('connectButton').style.display = "none";
        document.getElementById('swapScreen').style.visibility = "visible";
        document.getElementById('screenBg').style.border = "#C6C6C6 1px solid";
        document.getElementById('screenBg').style.animation = "shrink 0.5s, bggradient 20s ease-in-out infinite";
        document.getElementById('screenBg').style.animationFillMode = "forwards";
        /*document.getElementById('logo').style.filter = "invert(0)";*/
    }

    const handleFromChange = (selectedOption) => {
        setFrom(selectedOption);
    }

    const handleToChange = (selectedOption) => {
        setTo(selectedOption);
    }

    const swapSide = () => {
        let hold = fromValue;
        setFrom(toValue);
        setTo(hold);
    }

    const swapToken = () => {
        if (fromValue.value !== toValue.value) {
            setError('');
        }
        else {
            setError('Fields cannot match.');
        }
    }

    return(
        
        <div style={{width:'350px', height:'625px', backgroundColor:"white", borderRadius:'10px', border: '1px solid #c8c8c8'}}>
        <div id="screenBg" align="center" style={{width:'350px', borderRadius:'10px', zIndex:"1", position:'absolute'}}>
            <img id='logo' src={logo} alt='' style={{width:'240px', margin:'50px', filter: 'invert(1)'}}/>
            <div  id='connectButton'><Button onClick={connect} style={{padding:'10px', marginTop:'80px', width:'200px', backgroundColor:'#88888830', border:'white solid 1px', fontSize:'20px', color:'white'}}>Connect</Button></div>
        </div>
        <div align="center">
        
           
        <div id='swapScreen' style={{visibility:'hidden', marginTop: '45%'}}>
        
        {connected? <></>:null}
        {error? <Alert variant='danger' style={{width:'230px'}}>{error}</Alert>:<><br/><br/></>}
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
            <Select value={fromValue} onChange={handleFromChange} options={options}/>
                <div class="row" style={{marginTop:'10px'}}>
                    <div class="col">

                        <input type="number" onChange={(e)=>setOutputAmount(e.target.value)} style={{border:'#C6C6C6 1px solid'}}/>

                    </div>
                    <div class="col">
                        <p>{fromValue.value}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
                <img src={ hoverSwap? swapSideIcon:downArrow} alt='' onClick={swapSide} style={{margin:'10px', cursor:'pointer'}} onMouseEnter={()=>setHoverSwap(true)} onMouseLeave={()=>setHoverSwap(false)} />
            </div>
        </div>
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
            <Select value={toValue} onChange={handleToChange} options={options}/>
            <p style={{marginTop:'10px'}}>{outputAmount} {toValue.value}</p>
            </div>
        </div>
        <br/>
        <Button id="swapButton" style={{margin:'auto', width:'220px', fontSize:'20px'}} onClick={swapToken}>Swap</Button>
        
        </div>
       
        </div>
        </div>
    );
}