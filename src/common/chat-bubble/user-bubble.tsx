import type React from "react";

interface UserBubbleProps {
  content: string;
}

const UserBubble: React.FC<UserBubbleProps> = ({ content }) => {
  return (
    <div className="flex justify-end">
      <div className="border p-2 rounded-md max-w-xl bg-card">{content}</div>
    </div>
  );
};

export default UserBubble;
