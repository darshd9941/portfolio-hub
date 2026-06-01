import { PublicHome, type PublicRepo } from "@/components/public-home";

export const revalidate = 3600;

const fallbackRepos: PublicRepo[] = [
  {
    name: "figma-ae-bridge",
    description:
      "Robust Figma-to-After Effects layer transfer with a Figma plugin and AE CEP panel.",
    html_url: "https://github.com/darshd9941/figma-ae-bridge",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    updated_at: "2026-05-01T09:48:38Z",
    topics: [],
  },
  {
    name: "ae-auto-caption",
    description:
      "Auto-caption After Effects compositions with Whisper transcription and styled text layers.",
    html_url: "https://github.com/darshd9941/ae-auto-caption",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T10:14:59Z",
    topics: [],
  },
  {
    name: "brand-consistency-checker",
    description:
      "Validate AI outputs against brand rules using YAML specs and compliance reports.",
    html_url: "https://github.com/darshd9941/brand-consistency-checker",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T09:57:05Z",
    topics: [],
  },
  {
    name: "prompt-archaeologist",
    description:
      "Upload any AI image and reverse-engineer a usable SD/Flux prompt and style analysis.",
    html_url: "https://github.com/darshd9941/prompt-archaeologist",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T10:01:56Z",
    topics: [],
  },
  {
    name: "ai-rough-cut-assistant",
    description:
      "AI-powered rough cuts for Premiere Pro with transcription, take selection, and XML output.",
    html_url: "https://github.com/darshd9941/ai-rough-cut-assistant",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T10:06:06Z",
    topics: [],
  },
  {
    name: "comfyui-memory-manager",
    description:
      "ComfyUI custom node for VRAM monitoring, model unloading, and memory budget mode.",
    html_url: "https://github.com/darshd9941/comfyui-memory-manager",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T09:29:38Z",
    topics: [],
  },
];

async function getRepos() {
  try {
    const response = await fetch(
      "https://api.github.com/users/darshd9941/repos?per_page=100&sort=updated",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate,
        },
      },
    );

    if (!response.ok) {
      return fallbackRepos;
    }

    const repos = (await response.json()) as PublicRepo[];

    return repos
      .filter((repo) => repo.description && !repo.name.includes(".github"))
      .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));
  } catch {
    return fallbackRepos;
  }
}

export default async function Home() {
  const repos = await getRepos();

  return <PublicHome repos={repos} />;
}
