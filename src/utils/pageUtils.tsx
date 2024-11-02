import defaultContent from "../content.json"
import { useEffect, useState } from "react";

export interface PageProps {
  content?: typeof defaultContent;
}

export function useContent(providedContent?: typeof defaultContent) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    if (providedContent) {
      setContent(providedContent);
    }
  }, [providedContent]);

  return content;
}
