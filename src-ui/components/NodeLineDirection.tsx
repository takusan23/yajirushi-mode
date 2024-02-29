import Direction from "../data/Direction"

/** NodeLineDirection へ渡す Props */
type NodeLineDirectionProps = {
    /** 向き */
    direction: Direction,
    /** 変化時 */
    onChange: (direction: Direction) => void
}

/** アイテム（ノードの）東西南北どこから線を引き始める・終わるかを設定する */
function NodeLineDirection({ direction, onChange }: NodeLineDirectionProps) {
    return (
        <div className="flex items-center justify-center h-20 w-20 border-black border-2">
            <label htmlFor="direction">方角</label>
            <select
                id="direction"
                value={direction}
                onChange={(ev) => onChange(ev.target.value as Direction)}
            >
                <option value="top">↑</option>
                <option value="bottom">↓</option>
                <option value="left">←</option>
                <option value="right">→</option>
            </select>
        </div>
    )
}

export default NodeLineDirection