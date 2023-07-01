import ProposalList from "../components/ProposalList";
import StaticData from "../components/governor/StaticData";
import { Button } from "../components/ui/button";
import { HIPGovernor } from "../helper/contract";
import { Link } from "react-router-dom";

function GovernorManager() {
  return (
    <div className="text-white">
      <h1>Hipostel (HIP) Governor Contract: {HIPGovernor}</h1>
      <Button asChild variant="ghost" className="font-medium mx-1">
        <Link to="/create-proposal">Create Proposal</Link>
      </Button>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <StaticData />
        <ProposalList />

        {/* // <StaticData />
                // <Balance /> 
                // <Delegate />
                // <Transfer /> */}
        {/* <TransferOwner token={state} />
                <Delegate token={state} />
                <Balance token={state} /> */}
      </div>

      
    </div>
  );
}

export default GovernorManager;
