import StaticData from "../components/token/StaticData";
// import Delegate from "../components/token/Delegate";
import Balance from "../components/token/Balance";
import Delegate from "../components/token/Delegate";
import { HIPtoken } from "../helper/contract";
import Transfer from "../components/token/Transfer";

// import TransferOwner from "../components/token/TransferOwner";

function TokenManager() {

    

    return(
        <div style={{ height: '100%', width: '100%' }}>
            <h1>Hipostel (HIP) Token Contract: {HIPtoken}</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <StaticData />
                <Balance /> 
                <Delegate />
                <Transfer />
                {/* <TransferOwner token={state} />
                <Delegate token={state} />
                <Balance token={state} /> */}


            </div>

        </div>
    )
}

export default TokenManager;


