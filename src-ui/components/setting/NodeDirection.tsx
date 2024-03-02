import { Direction, Size } from "../../../src-common/MessageTypes"
import NodeLineDirection from "./NodeLineDirection"
import DirectionSvg from "../../icons/yajirushi-mode-direction.svg?react"

/** NodeDirection へ渡す Props */
type NodeDirectionProps = {
    /** 開始側のアイテムのサイズ */
    startNodeSize: Size
    /** 矢印を出す方角 */
    startNodeDirection: Direction
    /** 終了側アイテムのサイズ */
    endNodeSize: Size
    /** 矢印をもらう方角 */
    endNodeDirection: Direction
    /** 変化時に呼ばれる */
    onChange: (start: Direction, end: Direction) => void
}

/** どこから線を出して入れるか */
function NodeDirection({ startNodeSize, startNodeDirection, endNodeSize, endNodeDirection, onChange }: NodeDirectionProps) {
    return (
        <div className="flex flex-col">
            <div className="flex flec-row items-center px-2 py-1 space-x-1">
                <DirectionSvg className="svg-color" />
                <p className="flex-1 text-base text-content-light dark:text-content-dark">線の出入り口</p>
            </div>
            <div className="flex flex-row justify-evenly space-x-2 py-2">
                <NodeLineDirection
                    index={1}
                    nodeSize={startNodeSize}
                    direction={startNodeDirection}
                    onChange={(direction) => onChange(direction, endNodeDirection)} />
                <NodeLineDirection
                    index={2}
                    nodeSize={endNodeSize}
                    direction={endNodeDirection}
                    onChange={(direction) => onChange(startNodeDirection, direction)} />
            </div>
        </div>
    )
}

export default NodeDirection