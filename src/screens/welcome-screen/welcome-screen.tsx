import "./welcome-screen.scss";
import { getRandomChips } from "@/constants/try-it-ideas";
import Chip from "@/common/components/chip/chip";
import Galaxy from "@/components/Galaxy";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { motion } from "motion/react";
import PromptArea from "@/common/prompt-area/prompt-area";
import { useDebate } from "@/hooks/use-debate";
import { useSessions } from "@/hooks/use-sessions";
import UsageLimitDialog from "@/components/usage-limit-dialog/usage-limit-dialog";

const WelcomeScreen = () => {
  const [chips, setChips] = useState<string[]>(getRandomChips());
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [sendBtnDisabled, setSendBtnDisabled] = useState<boolean>(true);
  const [promptValue, setPromptValue] = useState<string>("");
  const [summoningBoard, setSummoningBoard] = useState<boolean>(false);
  const [showLimitDialog, setShowLimitDialog] = useState<boolean>(false);

  const { startDebate } = useDebate();
  const { data: sessions = [] } = useSessions();

  const handleChipClick = (title: string) => {
    setPromptValue(title);
    setSendBtnDisabled(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | { target: { value: string } }) => {
    const value = e.target.value;
    setPromptValue(value);
    setSendBtnDisabled(!value);
  };

  const handleSummonAgent = async () => {
    // Idea Cap: Max 2 ideas
    if (sessions.length >= 2) {
      setShowLimitDialog(true);
      return;
    }

    setSummoningBoard(true);
    startDebate(promptValue);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    navigate("/boardroom");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setChips([...getRandomChips()]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <UsageLimitDialog 
        isOpen={showLimitDialog} 
        onClose={() => setShowLimitDialog(false)} 
        title="Idea Limit Reached"
        description="Your free tier allows for 2 boardroom ideas. Clear or archive old ideas to start something new."
      />
      
      <div
        className="fixed inset-0"
        style={{
          width: "100%",
          height: "calc(100% - 44px)",
        }}
      >
        <Galaxy
          twinkleIntensity={0.3}
          density={0.6}
          glowIntensity={theme.theme === "light" ? 0.05 : 0.3}
          centerRepulsion={summoningBoard}
          repulsionStrength={summoningBoard ? 10 : 1}
        />
      </div>
      <div className="content-wrapper flex items-center justify-start flex-col px-4 md:px-8">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl mt-12 md:mt-16 z-1 text-center header font-bold leading-tight"
          key={summoningBoard ? "initial" : "summoning"}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          }}
        >
          {summoningBoard ? (
            <>
              Summoning
              <br /> the board
            </>
          ) : (
            "Five AI executives. One idea. Total chaos."
          )}
        </motion.h1>
        <div className="mt-16 md:mt-32 mb-6 z-1 w-full max-w-3xl">
          <PromptArea
            inputDisabled={summoningBoard}
            value={promptValue}
            onValueChange={handleInputChange}
            buttonLabel="summon the board"
            buttonDisabled={sendBtnDisabled || summoningBoard}
            onClick={handleSummonAgent}
            placeholder="I want to build..."
          />
        </div>
        <motion.div
          className="flex flex-wrap gap-2 justify-center z-10"
          key={chips.toString()}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
          }}
        >
          {chips.map((chip) => (
            <Chip
              disabled={summoningBoard}
              title={chip}
              key={chip}
              callBack={() => handleChipClick(chip)}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default WelcomeScreen;
