
/** CornerRadius に渡す Props */
type CornerRadiusProps = {
    /** どれくらい角丸 */
    cornerRadius: number
    /** 変化時に呼ばれる */
    onChange: (cornerRadius: number) => void
}

/** 角をどれだけ丸めるか */
function CornerRadius({ cornerRadius, onChange }: CornerRadiusProps) {
    return (
        <div className="flex flex-row  items-center p-2">
            <p className="flex-1 text-lg">角丸（角の半径）</p>
            <input
                className="flex-1 min-w-0 pl-2 rounded-sm border-gray-500 border-[1px] focus:outline-none"
                type="number"
                value={cornerRadius}
                onChange={(ev) => onChange(Number(ev.target.value))}
            />
        </div>
    )
}

export default CornerRadius