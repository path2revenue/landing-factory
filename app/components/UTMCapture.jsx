"use client";

import { useEffect } from "react";
import { captureUTMs } from "../../lib/utm";

/**
 * Invisible component that captures UTM params from the URL on first load.
 * Place this in the root layout so UTMs are captured regardless of landing section.
 */
export default function UTMCapture() {
    useEffect(() => {
        captureUTMs();
    }, []);

    return null;
}
