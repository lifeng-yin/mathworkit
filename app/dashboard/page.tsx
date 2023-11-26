'use client'

import Link from 'next/link';
import './style.css'
import useLocalStorageState from "use-local-storage-state";


export default function Dashboard() {
    const [notes, setNotes] = useLocalStorageState<any>('notes', {
        defaultValue: {}
    })
    return <main>
        <h1 className="text-[40px] font-bold">Dashboard</h1>
        <table className='mb-8'><tbody>
            <tr>
                <th>Note title</th>
                <th>View</th>
                <th>Edit</th> 
                <th>Delete</th>
            </tr>
            { Object.entries(notes).map((note: any) => {
                return <tr>
                    <td>{note[1].title || 'Untitled'}</td>
                    <td><Link href={`http://localhost:3000/view/${note[0]}`}>View</Link></td>
                    <td><Link href={`http://localhost:3000/edit/${note[0]}`}>Edit</Link></td>
                    <td><button className='px-4 py-2 rounded-lg bg-red-600 text-white'
                    onClick={oldNotes => {
                        const copy = {...oldNotes}
                        delete copy[note[0]]
                        return copy
                    }}>Delete</button></td>
                </tr>
            })}
        </tbody></table>
        <Link className='w-48  bg-blue-500 translate-y-20 px-6 py-2 text-white rounded-lg mt-40 hover:bg-blue-600' href="/edit/593729">Create a new note</Link>
    </main>
}