import { useNavigate } from 'react-router-dom';
import { Web3Button } from '@web3modal/react'



export default function Navbar(){
    const navigate = useNavigate();
    // const { chain } = useNetwork()
    // console.log("")
    return(
        <div style={{display: 'flex', flexDirection: 'row', height: '20%',margin: '1%', padding: '1%' ,justifyContent: 'space-between' }}>
            
            <div >
                <p></p>
                <h1 className='title'>Chimp House</h1>
                <p className='icon-title'>by Hipostel & Equilabs</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '40%', justifyContent: 'space-around'}}>
                <button style={{borderWidth: 2, borderRadius: 20, padding: 8 }} onClick={()=> navigate('/token-manager')}>Token Manager</button>
                <button style={{borderWidth: 2, borderRadius: 20, padding: 8 }} onClick={()=> navigate('/governor-manager')}>DAO Manager</button>
                <Web3Button />
            </div>
            {/* <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'space-around' }}>
                {chain && <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><div style={{backgroundColor: '#9bfb97', width: '10px', height:'10px', borderRadius: '10px', marginRight: '10px'}}></div> {chain.name}</div>}
                

            </div> */}
            
            {/* <ConnectButton/> */}
        </div>
    )
}