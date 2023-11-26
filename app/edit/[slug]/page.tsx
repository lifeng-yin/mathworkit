"use client"

import Editor from "@/components/editor/editor";
import { useState } from "react";

const defaultText = `This is to display the 
\`$c = \\pm\\sqrt{a^2 + b^2}$\`
 in one line

\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
`;

export default function App() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState(defaultText)

    return (<>
        <label htmlFor="title" className="font-bold text-lg">Title</label>
        <br />
        <input name="title" value={title} onChange={e => setTitle(e.target.value)} className="border-slate-300 border-[1px] border-solid rounded px-4 py-2 text-xl font-bold mb-4"></input>
        <Editor text={text} setText={setText}/>
    </>)
}
