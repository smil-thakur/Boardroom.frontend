import "./welcome-screen.scss";
import { Textarea } from "@/components/ui/textarea";
import { getRandomChips } from "@/constants/try-it-ideas";
import Chip from "@/common/components/chip/chip";
import Galaxy from "@/components/Galaxy";
import { useTheme } from "@/components/theme-provider";
import { useRef, useState, type BaseSyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Mic, SendHorizonal } from "lucide-react";

const WelcomeScreen = () => {
  const chips = useRef(getRandomChips());
  const theme = useTheme();
  const handleChipClick = (title: string) => {
    setPromptValue(title);
    setSendBtnDisabled(false);
  };
  const [sendBtnDisabled, setSendBtnDisabled] = useState<boolean>(true);
  const [promptValue, setPromptValue] = useState<string>("");
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
        />
      </div>
      <div className="content-wrapper flex items-center justify-start flex-col">
        <h1 className="text-8xl mt-16 z-1 text-center">
          Five AI executives. One idea. Total chaos.
        </h1>
        <div className="mobile-width mt-32 mb-4 z-1 flex flex-col w-full items-center gap-2 border-2 p-2 rounded-lg bg-background">
          <Textarea
            id="idea-input"
            value={promptValue}
            onChange={handleInputChange}
            placeholder="I want to build a....."
            className="max-h-32 z-1"
          />
          <div className="flex justify-between w-full">
            <div>
              <Button>
                <Mic />
              </Button>
            </div>
            <div>
              <Button disabled={sendBtnDisabled}>
                Summon the board
                <SendHorizonal />
              </Button>
            </div>
          </div>
        </div>
        <div className="chips-grid z-1">
          {chips.current.map((chip) => (
            <Chip
              title={chip}
              key={chip}
              callBack={() => handleChipClick(chip)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
