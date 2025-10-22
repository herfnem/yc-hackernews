import { NewsView } from "@/views/news";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/yc-hackernews")({
  component: NewsView,
});
