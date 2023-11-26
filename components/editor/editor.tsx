import { Dispatch, SetStateAction } from "react";
import MDEditor from "@uiw/react-md-editor";
import "katex/dist/katex.css";
import katex from 'katex';
import { getCodeString } from 'rehype-rewrite';
import './style.scss'

const Editor = ({ text, setText }: { text: string, setText: Function }) => {
    return <MDEditor
            data-color-mode="light"
            value={text}
            textareaProps={{
                placeholder: "Please enter Markdown text"
            }}
            autoFocus={true}
            height={500}
            onChange={(value: any) => setText(value)}
            previewOptions={{
                components: {
                code: ({ inline, children = [], className, ...props }) => {
                    const txt = children[0] || '';
                    if (inline) {
                    if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                        const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                        throwOnError: false,
                        });
                        return <code dangerouslySetInnerHTML={{ __html: html }} />;
                    }
                    return <code>{txt}</code>;
                    }
                    const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                    if (
                    typeof code === 'string' &&
                    typeof className === 'string' &&
                    /^language-katex/.test(className.toLocaleLowerCase())
                    ) {
                    const html = katex.renderToString(code, {
                        throwOnError: false,
                    });
                    return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                    }
                    return <code className={String(className)}>{children}</code>;
                },
                },
            }}
        />
}

export default Editor;