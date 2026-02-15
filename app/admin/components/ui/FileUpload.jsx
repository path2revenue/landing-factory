"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

export default function FileUpload({ label, value, onChange, folder, ...props }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);
            if (folder) formData.append("folder", folder);

            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (err) {
            setError(err.message || "Erreur lors de l'upload");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}

            {value ? (
                <div className="relative group w-full max-w-[200px] aspect-sqaure rounded-lg border border-slate-700 bg-slate-800 overflow-hidden flex items-center justify-center p-2">
                    {value.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                        <img
                            src={value}
                            alt="Uploaded"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="text-slate-400 text-xs break-all px-2">
                            {value.split('/').pop()}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        onChange={handleUpload}
                        accept="image/*,.pdf"
                        disabled={uploading}
                        {...props}
                    />
                    <div className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-colors">
                        {uploading ? (
                            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        ) : (
                            <>
                                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                                <span className="text-xs text-slate-400">
                                    Glisser ou cliquer pour upload
                                </span>
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}

