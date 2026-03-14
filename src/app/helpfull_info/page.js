"use client";
import { useEffect, useState } from "react";

export default function BrandsPublic() {
    const [text, setText] = useState("Loading...");

    useEffect(() => {
        fetch("/api")
            .then(r => {
                if (!r.ok) throw new Error("api error");
                return r.text();
            })
            .then(setText)
            .catch(() => setText("Failed to load"));
    }, []);

    return <pre>{text}</pre>;
}
