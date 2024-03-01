/** RequiredLine へ渡す Props */
type RequiredLineProps = {
    /** 線を伸ばす値 */
    requiredLine: number,
    /** 変化時 */
    onChange: (requiredLine: number) => void
}

/** 線を描く際に、右左折が必要な場合でもこの値まではまっすぐ突き進んでほしいとき。を設定する。 */
function RequiredLine({ requiredLine, onChange }: RequiredLineProps) {
    return (
        <div className="flex flex-row items-center p-2">
            <p className="flex-1 text-lg">線を伸ばす</p>
            <input
                className="flex-1 min-w-0 pl-2 rounded-sm border-gray-500 border-[1px] focus:outline-none"
                type="number"
                value={requiredLine}
                onChange={(ev) => onChange(Number(ev.target.value))}
            />
        </div>
    )
}

export default RequiredLine