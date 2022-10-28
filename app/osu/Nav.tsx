import Link from "next/link";


export default function Nav() {
    return (
        <>
        <div className="flex flex-col">
            <Link href="/">HOME </Link>
            <Link href="/osu">OSULINKUU</Link>
        </div>
        </>
    )
}