/** LineWeight に渡す Props */
type LineWeightProps = {
    /** 線の太さ */
    lineWeight: number
    /** 線の太さ変更時 */
    onChange: (lineWeight: number) => void
}

/** 線の太さを設定する */
function LineWeight({ lineWeight, onChange }: LineWeightProps) {
    return (
        <div className="flex flex-row  items-center p-2">
            <p className="flex-1 text-lg">矢印の向き</p>
            <input
                className="flex-1 min-w-0 pl-2 rounded-sm border-gray-500 border-[1px] focus:outline-none"
                type="number"
                value={lineWeight}
                onChange={(ev) => onChange(Number(ev.target.value))}
            />
        </div>
    )
}

export default LineWeight