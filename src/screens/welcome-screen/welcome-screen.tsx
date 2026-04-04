import "./welcome-screen.scss";
import { getRandomChips } from "@/constants/try-it-ideas";
import Chip from "@/common/components/chip/chip";
import Galaxy from "@/components/Galaxy";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState, type BaseSyntheticEvent } from "react";

import { useNavigate } from "react-router";
import { motion } from "motion/react";
import PromptArea from "@/common/prompt-area/prompt-area";

const WelcomeScreen = () => {
  const [chips, setChips] = useState<string[]>(getRandomChips());
  const theme = useTheme();
  const navigate = useNavigate();
  const handleChipClick = (title: string) => {
    setPromptValue(title);
    setSendBtnDisabled(false);
  };
  const [sendBtnDisabled, setSendBtnDisabled] = useState<boolean>(true);
  const [promptValue, setPromptValue] = useState<string>("");
  const [summoningBoard, setSummoningBoard] = useState<boolean>(false);
  const handleInputChange = (e: BaseSyntheticEvent) => {
    const input = e.target as HTMLTextAreaElement;
    const value = input.value;
    setPromptValue(value);
    if (value) {
      setSendBtnDisabled(false);
    } else {
      setSendBtnDisabled(true);
    }
  };
  const handleSummonAgent = async () => {
    setSummoningBoard(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    navigate("/boardroom");
  };

  useEffect(() => {
    setInterval(() => {
      setChips([...getRandomChips()]);
    }, 6000);
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "calc(100% - 44px)",
          position: "absolute",
        }}
      >
        <Galaxy
          twinkleIntensity={0.3}
          density={0.6}
          glowIntensity={theme.theme === "light" ? 0.05 : 0.3}
          centerRepulsion={summoningBoard ? true : false}
          repulsionStrength={summoningBoard ? 10 : 1}
        />
      </div>
      <div className="content-wrapper flex items-center justify-start flex-col">
        <motion.h1
          className="text-8xl mt-16 z-1 text-center header font-bold"
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
        <div className="mt-32 mb-4 z-1 mobile-width">
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
          className="chips-grid z-1"
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
