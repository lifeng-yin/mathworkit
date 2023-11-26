import useLocalStorageState from "use-local-storage-state"

export default function Page({ params }: { params: { slug: string } }) {

    const [notes, setNotes] = useLocalStorageState<any>('notes', {
        defaultValue: {}
    })

    const note = notes[params.slug]

    if (!note) return <div>404 Note Not Found</div>

    return <main>
        
    </main>
}