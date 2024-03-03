import { useTranslation } from "react-i18next"
import { Direction, Size } from "../../../src-common/MessageTypes"
import NodeLineDirection from "./NodeLineDirection"
import DirectionSvg from "../../icons/yajirushi-mode-direction.svg?react"

/** 縦並び */
type SelectNodeVertical = {
    orientation: 'vertical',
    top: 'start' | 'end',
    bottom: 'start' | 'end'
}

/** 横並び */
type SelectNodeHorizontal = {
    orientation: 'horizontal',
    left: 'start' | 'end',
    right: 'start' | 'end'
}

/** 縦か横ならび */
export type SelectNodeOrientation = SelectNodeVertical | SelectNodeHorizontal

/** NodeDirection へ渡す Props */
type NodeDirectionProps = {
    /** プレビューで縦並びにするか、横並びにするか */
    selectNodeOrientation: SelectNodeOrientation
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
function NodeDirection({ selectNodeOrientation, startNodeSize, startNodeDirection, endNodeSize, endNodeDirection, onChange }: NodeDirectionProps) {
    const { t } = useTranslation()

    /** startNode の <NodeLineDirection /> を作る */
    function createStartNodeLineDirection() {
        return <NodeLineDirection
            index={1}
            nodeSize={startNodeSize}
            direction={startNodeDirection}
            onChange={(direction) => onChange(direction, endNodeDirection)} />
    }

    /** endNode の <NodeLineDirection /> を作る */
    function createEndNodeLineDirection() {
        return <NodeLineDirection
            index={2}
            nodeSize={endNodeSize}
            direction={endNodeDirection}
            onChange={(direction) => onChange(startNodeDirection, direction)} />
    }

    return (
        <div className="flex flex-col">
            <div className="flex flec-row items-center px-3 py-1 space-x-1">
                <DirectionSvg className="svg-color" />
                <p className="flex-1 text-base text-content-light dark:text-content-dark">
                    {t('arrowsetting.nodedirection.title')}
                </p>
            </div>

            {/* 縦並びか横並びかで分岐 */}
            {
                selectNodeOrientation.orientation === 'vertical'
                    //縦
                    ? <div className="flex flex-col items-center space-y-7 py-2">
                        {
                            // 上
                            selectNodeOrientation.top === 'start' ? createStartNodeLineDirection() : createEndNodeLineDirection()
                        }
                        {
                            // 下
                            selectNodeOrientation.bottom === 'start' ? createStartNodeLineDirection() : createEndNodeLineDirection()
                        }
                    </div>
                    // 横
                    : <div className="flex flex-row justify-evenly space-x-2 py-2">
                        {
                            // 左
                            selectNodeOrientation.left === 'start' ? createStartNodeLineDirection() : createEndNodeLineDirection()
                        }
                        {
                            // 右
                            selectNodeOrientation.right === 'start' ? createStartNodeLineDirection() : createEndNodeLineDirection()
                        }
                    </div>
            }
        </div>
    )
}

export default NodeDirection