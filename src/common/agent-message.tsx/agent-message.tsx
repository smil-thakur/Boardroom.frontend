import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface AgentMessageProps {
  content: string;
}

const AgentMessage = ({ content }: AgentMessageProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        p: ({ children }) => (
          <p className="text-sm leading-relaxed mb-2 last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-medium text-white">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="text-sm list-disc list-inside space-y-1 mb-2">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="text-sm list-decimal list-inside space-y-1 mb-2">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="text-sm">{children}</li>,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-2">
            <table className="text-sm w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="text-left text-xs font-medium text-white/60 border-b border-white/10 pb-1 pr-4">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="text-sm py-1 pr-4 border-b border-white/5">
            {children}
          </td>
        ),
        code: ({ children }) => (
          <code className="text-xs bg-white/10 rounded px-1 py-0.5">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-white/20 pl-3 text-white/60 italic mb-2">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default AgentMessage;
