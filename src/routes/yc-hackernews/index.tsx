import { HomePageView } from "@/views/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/yc-hackernews/")({
  component: HomePageView,
});
