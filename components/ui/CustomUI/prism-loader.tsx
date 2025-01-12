"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "./theme.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default function PrismLoader() {
    useEffect(() => {
        // Matches the string "satisfies ChartConfig"
        (Prism.languages.tsx as any)['satisfies-chartconfig'] = {
            pattern: /(satisfies) (ChartConfig)/,
            inside: {
                'satisfies': {
                    pattern: /satisfies/,
                    alias: 'satisfies'
                },
                'chartconfig': {
                    pattern: /ChartConfig/,
                    alias: 'chartconfig'
                }
            }
        };

        // Matches equal operator "="
        Prism.languages.tsx['operator'] = {
            pattern: /=/,
            alias: 'operator equal'
        };

        // Matches anything that is between ={ and }
        (Prism.languages.tsx as any)['jsx-expression'] = {
            pattern: /=(\{[^}]+\})/,
            inside: {
                'expression': {
                    pattern: /\{[^}]+\}/,
                    inside: {
                        'jsx-expression': {
                            pattern: /[^{}]+/,
                            alias: 'jsx-expression'
                        }
                    }
                }
            }
        };
        Prism.highlightAll();
    }, []);
    return <div className="hidden"></div>;
}