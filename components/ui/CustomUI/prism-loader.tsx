"use client";

import { useEffect } from "react";
import Prism from "prismjs";
// import "prismjs/themes/prism.css";
import "./prism-one-dark.css"
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default function PrismLoader() {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return <div className="hidden"></div>;
}