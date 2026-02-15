"use client";

export default function Textarea({ label, error, rows = 3, ...props }) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}
            <textarea
                rows={rows}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 hover:border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 resize-y"
                {...props}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}
