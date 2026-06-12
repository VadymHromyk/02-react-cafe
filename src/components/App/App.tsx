import { useState } from "react";
import CafeInfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";
import type { Votes, VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleVote(type: VoteType) {
    if (type === "good") {
      setVotes((prevVotes) => ({ ...prevVotes, good: prevVotes.good + 1 }));
    } else if (type === "neutral") {
      setVotes((prevVotes) => ({
        ...prevVotes,
        neutral: prevVotes.neutral + 1,
      }));
    } else if (type === "bad") {
      setVotes((prevVotes) => ({
        ...prevVotes,
        bad: prevVotes.bad + 1,
      }));
    }
  }

  function resetVotes() {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
