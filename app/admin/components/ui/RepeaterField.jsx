"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

/**
 * RepeaterField - Dynamic list editor for admin forms
 *
 * Props:
 *   label       - Section title
 *   items       - Array of items
 *   onChange     - (newItems) => void
 *   renderItem  - (item, index, updateItem) => JSX
 *   newItem     - () => object (factory for blank items)
 *   max         - Optional max items
 *   addLabel    - Custom "Add" button text
 *   simple      - If true, items are strings (no renderItem needed)
 *   simplePlaceholder - Placeholder for simple mode inputs
 */
export default function RepeaterField({
    label,
    items = [],
    onChange,
    renderItem,
    newItem,
    max = 20,
    addLabel = "Ajouter",
    simple = false,
    simplePlaceholder = "",
}) {
    const addItem = () => {
        if (items.length >= max) return;
        const blank = simple ? "" : newItem ? newItem() : {};
        onChange([...items, blank]);
    };

    const removeItem = (idx) => {
        onChange(items.filter((_, i) => i !== idx));
    };

    const moveItem = (idx, dir) => {
        const target = idx + dir;
        if (target < 0 || target >= items.length) return;
        const copy = [...items];
        [copy[idx], copy[target]] = [copy[target], copy[idx]];
        onChange(copy);
    };

    const updateItem = (idx, updated) => {
        const copy = [...items];
        copy[idx] = updated;
        onChange(copy);
    };

    return (
        <div className="space-y-3">
            {label && (
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-200">
                        {label}
                    </label>
                    <span className="text-xs text-slate-500">
                        {items.length}/{max}
                    </span>
                </div>
            )}

            <div className="space-y-2">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="group relative bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                    >
                        {/* Controls */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => moveItem(i, -1)}
                                disabled={i === 0}
                                className="p-1 text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Monter"
                            >
                                <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveItem(i, 1)}
                                disabled={i === items.length - 1}
                                className="p-1 text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Descendre"
                            >
                                <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="p-1 text-slate-500 hover:text-red-400"
                                title="Supprimer"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Content */}
                        {simple ? (
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => updateItem(i, e.target.value)}
                                placeholder={simplePlaceholder}
                                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            renderItem(item, i, (updated) =>
                                updateItem(i, updated)
                            )
                        )}
                    </div>
                ))}
            </div>

            {items.length < max && (
                <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 border border-dashed border-slate-700 rounded-lg hover:border-blue-500 hover:bg-blue-500/5 transition-colors w-full justify-center"
                >
                    <Plus className="w-4 h-4" />
                    {addLabel}
                </button>
            )}
        </div>
    );
}
