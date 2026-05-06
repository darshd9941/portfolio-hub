"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Check,
  Edit3,
  Eye,
  Filter,
  Loader2,
  Plus,
  Send,
  Trash2,
  X,
} from "lucide-react";

type Draft = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  platforms: string[];
  status: "draft" | "approved" | "posted";
  created_at: string;
  updated_at: string;
};

const allPlatforms = ["Twitter", "YouTube", "Instagram", "Substack"];

const statusColors: Record<string, string> = {
  draft: "bg-[#f5f0e8]/10 text-[#bdb4aa]",
  approved: "bg-[#6affcc]/15 text-[#6affcc]",
  posted: "bg-[#ff8b70]/15 text-[#ff8b70]",
};

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image_url: "",
    platforms: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const refetch = useCallback(() => {
    const query = filter !== "all" ? `?status=${filter}` : "";
    fetch(`/api/drafts${query}`)
      .then((r) => r.json())
      .then((data) => {
        setDrafts(data);
        setLoading(false);
      })
      .catch(() => {
        showToast("Failed to load drafts");
        setLoading(false);
      });
  }, [filter, showToast]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const resetForm = () => {
    setForm({ title: "", content: "", image_url: "", platforms: [] });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      showToast("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      const url = editingId ? `/api/drafts/${editingId}` : "/api/drafts";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image_url: form.image_url || null,
        }),
      });

      if (res.ok) {
        showToast(editingId ? "Draft updated" : "Draft created");
        resetForm();
        refetch();
      } else {
        showToast("Failed to save draft");
      }
    } catch {
      showToast("Failed to save draft");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this draft?")) return;

    try {
      const res = await fetch(`/api/drafts/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Draft deleted");
        refetch();
      }
    } catch {
      showToast("Failed to delete draft");
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const res = await fetch(`/api/drafts/${id}/approve`, { method: "POST" });
      if (res.ok) {
        showToast("Draft approved");
        refetch();
      }
    } catch {
      showToast("Failed to approve draft");
    }
  };

  const handlePost = async (id: number) => {
    try {
      const res = await fetch(`/api/drafts/${id}/post`, { method: "POST" });
      const data = await res.json();
      showToast(data.error || "Post feature coming soon");
    } catch {
      showToast("Post feature coming soon");
    }
  };

  const startEdit = (draft: Draft) => {
    setForm({
      title: draft.title,
      content: draft.content,
      image_url: draft.image_url || "",
      platforms: draft.platforms || [],
    });
    setEditingId(draft.id);
    setShowForm(true);
  };

  const togglePlatform = (platform: string) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-12">
      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-6 z-50 rounded-lg border border-[#6affcc]/30 bg-[#111] px-5 py-3 text-sm text-[#6affcc] shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6affcc]">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f5f0e8] sm:text-4xl">
            Drafts
          </h1>
        </div>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-md bg-[#6affcc] px-5 text-sm font-bold text-[#06120f] transition hover:bg-[#9dffe1]"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          type="button"
        >
          <Plus size={16} />
          New Draft
        </button>
      </div>

      {/* Filter bar */}
      <div className="mt-6 flex items-center gap-2">
        <Filter size={16} className="text-[#8d867e]" />
        {["all", "draft", "approved", "posted"].map((s) => (
          <button
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
              filter === s
                ? "bg-[#f5f0e8] text-[#050505]"
                : "border border-[#f5f0e8]/12 text-[#8d867e] hover:border-[#6affcc]/50 hover:text-[#6affcc]"
            }`}
            key={s}
            onClick={() => setFilter(s)}
            type="button"
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Create/Edit form */}
      {showForm && (
        <div className="mt-6 rounded-lg border border-[#6affcc]/25 bg-[#0a0a0a] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#f5f0e8]">
              {editingId ? "Edit Draft" : "New Draft"}
            </h2>
            <button
              className="text-[#8d867e] transition hover:text-[#ff8b70]"
              onClick={resetForm}
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-[#8d867e]">
                Title
              </label>
              <input
                className="w-full rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 px-4 py-3 text-sm text-[#f5f0e8] outline-none transition focus:border-[#6affcc]/50"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Post title..."
                value={form.title}
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-[#8d867e]">
                Content
              </label>
              <textarea
                className="h-36 w-full resize-none rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 px-4 py-3 text-sm leading-relaxed text-[#f5f0e8] outline-none transition focus:border-[#6affcc]/50"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Write your content here..."
                value={form.content}
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-[#8d867e]">
                Image URL (optional)
              </label>
              <input
                className="w-full rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 px-4 py-3 text-sm text-[#f5f0e8] outline-none transition focus:border-[#6affcc]/50"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image_url: e.target.value }))
                }
                placeholder="https://..."
                value={form.image_url}
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-[#8d867e]">
                Platforms
              </label>
              <div className="flex flex-wrap gap-2">
                {allPlatforms.map((platform) => (
                  <button
                    className={`rounded-md px-3 py-2 text-xs font-bold transition ${
                      form.platforms.includes(platform)
                        ? "bg-[#6affcc] text-[#06120f]"
                        : "border border-[#f5f0e8]/12 text-[#8d867e] hover:border-[#6affcc]/50"
                    }`}
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    type="button"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="h-10 rounded-md border border-[#f5f0e8]/12 px-5 text-sm font-bold text-[#8d867e] transition hover:border-[#ff6a4a] hover:text-[#ff8b70]"
                onClick={resetForm}
                type="button"
              >
                Cancel
              </button>
              <button
                className="inline-flex h-10 items-center gap-2 rounded-md bg-[#6affcc] px-5 text-sm font-bold text-[#06120f] transition hover:bg-[#9dffe1] disabled:opacity-50"
                disabled={saving}
                onClick={handleSubmit}
                type="button"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editingId ? "Update" : "Create"} Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Draft list */}
      <div className="mt-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#6affcc]" size={24} />
          </div>
        ) : drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 py-20 text-center">
            <Edit3 className="text-[#8d867e]" size={40} />
            <p className="mt-4 text-sm text-[#8d867e]">
              {filter !== "all"
                ? `No ${filter} drafts found`
                : "No drafts yet. Create your first piece of content."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {drafts.map((draft) => (
              <div
                className="group rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-5 transition hover:border-[#f5f0e8]/20"
                key={draft.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-[#f5f0e8]">
                        {draft.title}
                      </h3>
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusColors[draft.status]}`}
                      >
                        {draft.status}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#bdb4aa]">
                      {draft.content}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {draft.platforms?.map((p) => (
                        <span
                          className="rounded-md border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 px-2 py-0.5 text-[10px] text-[#8d867e]"
                          key={p}
                        >
                          {p}
                        </span>
                      ))}
                      <span className="font-mono text-[10px] text-[#5a5148]">
                        {new Date(draft.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[#8d867e] transition hover:bg-[#f5f0e8]/10 hover:text-[#f5f0e8]"
                      onClick={() => startEdit(draft)}
                      title="Edit"
                      type="button"
                    >
                      <Edit3 size={15} />
                    </button>
                    {draft.status === "draft" && (
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#6affcc] transition hover:bg-[#6affcc]/10"
                        onClick={() => handleApprove(draft.id)}
                        title="Approve"
                        type="button"
                      >
                        <Check size={15} />
                      </button>
                    )}
                    {draft.status === "approved" && (
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#ff8b70] transition hover:bg-[#ff8b70]/10"
                        onClick={() => handlePost(draft.id)}
                        title="Post"
                        type="button"
                      >
                        <Send size={15} />
                      </button>
                    )}
                    {draft.status === "posted" && (
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#8d867e]"
                        title="View posted"
                        type="button"
                      >
                        <Eye size={15} />
                      </button>
                    )}
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[#8d867e] transition hover:bg-[#ff6a4a]/10 hover:text-[#ff6a4a]"
                      onClick={() => handleDelete(draft.id)}
                      title="Delete"
                      type="button"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
