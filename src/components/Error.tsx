
export default function Error({children}:{children:React.ReactNode}) {
    return (
        <p className="my-1 text-center bg-red-200 text-red-600 font-bold p-1 uppercase text-xs">
            {children}!!!
        </p>
    )
}
