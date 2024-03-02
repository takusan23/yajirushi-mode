import { ReactNode } from "react"
import { ArrowDirection } from "../../../src-common/MessageTypes"
import ArrowDirectionStartSideSvg from "../../icons/yajirushi-mode-arrow-direction-start-side.svg?react"
import ArrowDirectionEndSide from "../../icons/yajirushi-mode-arrow-direction-end-side.svg?react"
import ArrowDirectionStartEndSide from "../../icons/yajirushi-mode-arrow-direction-start-and-end.svg?react"

type LabelData = {
    arrowDirection: ArrowDirection
    children: ReactNode
}

const LabelArrowDirectionPair: LabelData[] = [
    { arrowDirection: 'startSide', children: <ArrowDirectionStartSideSvg /> },
    { arrowDirection: 'endSide', children: <ArrowDirectionEndSide /> },
    { arrowDirection: 'startAndEndSide', children: <ArrowDirectionStartEndSide /> },
]

/** ArrowDirection へ渡す Props */
type ArrowDirectionProps = {
    /** 現在の値 */
    arrowDirection: ArrowDirection
    /** 変換時に呼ばれる */
    onChange: (arrowDirection: ArrowDirection) => void
}

/** 矢印を開始側につけるか、終了側につけるのか、設定する */
function ArrowDirection({ arrowDirection, onChange }: ArrowDirectionProps) {
    return (
        <div className="flex flex-row items-center p-1 space-x-1">
            <ArrowDirectionStartSideSvg />
            <p className="flex-1 text-base">矢印の向き</p>
            <div className="flex-1">
                <ArrowDirectionSelection current={arrowDirection} onChange={onChange} />
            </div>
        </div>
    )
}

/** ArrowDirectionSelection に渡す Props */
type ArrowDirectionSelectionProps = {
    /** 現在の ArrowDirection */
    current: ArrowDirection,
    /** 変化時に呼ばれる */
    onChange: (arrowDirection: ArrowDirection) => void
}

/** 矢印の向きを決める。三択の中から */
function ArrowDirectionSelection({ current, onChange }: ArrowDirectionSelectionProps) {
    return (
        <div className="flex flex-row w-full">
            {
                LabelArrowDirectionPair.map((labelData) => {
                    // 選択中の場合は枠の色を変える
                    const selectStyle = labelData.arrowDirection === current ? 'border-blue-500 border-2' : 'border-gray-500 border-[1px]'
                    return (
                        <button
                            className={`flex-1 p-1 aspect-square ${selectStyle} cursor-pointer`}
                            onClick={() => onChange(labelData.arrowDirection)}
                            key={labelData.arrowDirection}>
                            {labelData.children}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default ArrowDirection