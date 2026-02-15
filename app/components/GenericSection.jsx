/**
 * Generic section placeholder for components not yet implemented.
 * Checks config[key] for content, otherwise stays hidden or shows debug info in dev.
 */
export default function GenericSection({ config, title }) {
    // For now, render nothing to avoid clutter.
    // In dev, we could render a placeholder.
    if (process.env.NODE_ENV === "development") {
        return (
            <section className="py-12 border-y border-dashed border-gray-300 bg-gray-50 text-center text-gray-400 text-sm">
                Placeholder: {title}
            </section>
        );
    }
    return null;
}
