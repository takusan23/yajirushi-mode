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
        <div className="flex flex-col w-20">
            <p>線を伸ばす</p>
            <input
                type="number"
                value={requiredLine}
                onChange={(ev) => onChange(Number(ev.target.value))}
            />
        </div>
    )
}

export default RequiredLine