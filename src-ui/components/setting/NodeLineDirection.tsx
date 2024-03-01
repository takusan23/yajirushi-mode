import { Direction, Size } from "../../../src-common/MessageTypes"

/** NodeLineDirection へ渡す Props */
type NodeLineDirectionProps = {
    /** 1個目 or 2個目 */
    index: 1 | 2,
    /** サイズ。ただ表示のためだけに使われる */
    nodeSize: Size
    /** 向き */
    direction: Direction,
    /** 変化時 */
    onChange: (direction: Direction) => void
}

/** アイテム（ノードの）東西南北どこから線を引き始める・終わるかを設定する */
function NodeLineDirection({ index, nodeSize, direction, onChange }: NodeLineDirectionProps) {
    return (
        <div className="relative aspect-square w-1/3 border-black border-2">

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p>{`${index}`}</p>
                <p>{`${nodeSize.width}x${nodeSize.height}`}</p>
            </div>

            {/* それぞれの方角で */}
            <DirectionButton direction="top" isSelect={direction === 'top'} onClick={onChange} />
            <DirectionButton direction="bottom" isSelect={direction === 'bottom'} onClick={onChange} />
            <DirectionButton direction="left" isSelect={direction === 'left'} onClick={onChange} />
            <DirectionButton direction="right" isSelect={direction === 'right'} onClick={onChange} />
        </div>
    )
}

/** DirectionButton へ渡す Props */
type DirectionButtonProps = {
    /** どの方角に出すか */
    direction: Direction
    /** 選択中かどうか */
    isSelect: boolean
    /** 押した時 */
    onClick: (direction: Direction) => void
}

/** 方角を決める丸いボタン */
function DirectionButton({ direction, isSelect, onClick }: DirectionButtonProps) {
    // 位置
    let positionStyle: string
    switch (direction) {
        case "top":
            positionStyle = 'inset-x-0 -top-3'
            break
        case "bottom":
            positionStyle = 'inset-x-0 -bottom-3'
            break
        case "left":
            positionStyle = 'inset-y-0 -left-3'
            break
        case "right":
            positionStyle = 'inset-y-0 -right-3'
            break
    }
    // 選択中なら色を変える
    const selectStyle = isSelect ? 'bg-blue-500' : 'bg-gray-500'

    return (
        <div className={`absolute ${positionStyle} flex items-center justify-center`} >
            <div
                className={`w-6 h-6 rounded-full ${selectStyle} cursor-pointer`}
                onClick={() => onClick(direction)}
            />
        </div>
    )
}

export default NodeLineDirection