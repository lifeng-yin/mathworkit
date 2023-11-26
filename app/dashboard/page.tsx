import './style.css'

export default function Dashboard() {
    return <main>
        <h1 className="text-[40px] font-bold">Dashboard</h1>
        <table>
            <thead>
                <td>Note name</td>
                <td>Edit</td>
                <td>Delete</td>
            </thead>
        </table>
    </main>
}