import { Circle } from "@/components"

const QRCode = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Circle />
            <div className="text-xl bg-white p-4 rounded-md font-bold">
                QRCode/BARCode
            </div>
        </div>
    )
}

export default QRCode