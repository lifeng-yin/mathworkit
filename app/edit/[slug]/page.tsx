"use client"

import Editor from "@/components/editor/editor";
import { useState, useEffect } from "react";
import Select from 'react-select';
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/navigation";


export default function Page({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const [notes, setNotes] = useLocalStorageState<any>('notes', {
        defaultValue: {}
    })

    if (!notes[params.slug]) {
        notes[params.slug] = {
            title: '',
            sections: []
        }
    }

    const [title, setTitle] = useState(notes[params.slug].title)
    const [noteSections, setNoteSections] = useState<object[]>(notes[params.slug].sections)
    const [selectedType, setSelectedType] = useState('text')
   

    const [isSelectingNewSection, setIsSelectingNewSection] = useState(false)
    

    return (<div className="flex flex-col">
        <label htmlFor="title" className="font-bold text-lg">Title</label>
        <br />
        <input name="title" value={title} onChange={e => setTitle(e.target.value)} className="border-slate-300 border-[1px] border-solid rounded px-4 py-2 text-xl font-bold mb-4 -mt-4"></input>
        {noteSections.map((section: any, index: number) => {
            console.log(noteSections)
            if (section.type === 'text') {
                return <Editor
                    key={index}
                    text={section.data}
                    setText={(newText: string) => setNoteSections(noteSections.map((c: any, i: number) => { 
                        if (i === index) {
                            // The one has been found
                            c.data = newText
                            return c
                        }
                        return c
                    }))}/>
            }
        })}

        {isSelectingNewSection ? 
            <div className="mt-8">
                <Select
                    defaultValue={selectedType}
                    onChange={(newValue: any) => {
                        console.log(newValue)
                        setSelectedType(newValue.value as string)}
                    }
                    options={[
                        { value: 'text', label: 'text'}
                    ]}
                />
                <button
                    className="w-36 bg-green-500 px-6 py-2 text-white rounded-lg mt-4 hover:bg-green-600"
                    onClick={() => {
                        setNoteSections(prev => [...prev, { 'type': selectedType, 'data': ''}])
                        setIsSelectingNewSection(false)
                    }}>Add Section</button>
            </div>
        : <button className="bg-slate-200 px-6 py-2 rounded-lg w-48 hover:bg-slate-300 mt-8" onClick={() => {
            setIsSelectingNewSection(true)
        }}>+ Add new section</button>}

        <button
            className="w-24 bg-blue-500 px-6 py-2 text-white rounded-lg mt-4 hover:bg-blue-600"
            onClick={() => {
                setNotes((prev: any) => ({
                    ...prev,
                    [params.slug]: {
                        'title': title,
                        'sections': noteSections
                    }
                }))
    
                router.push('/dashboard');

            }}
        >Save</button>
    </div>)
}
