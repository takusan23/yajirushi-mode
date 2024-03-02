import { ReactNode } from "react"
import { useTranslation } from "react-i18next";
import { ArrowDirection } from "../../../src-common/MessageTypes"
import ArrowDirectionStartSideSvg from "../../icons/yajirushi-mode-arrow-direction-start-side.svg?react"
import ArrowDirectionEndSide from "../../icons/yajirushi-mode-arrow-direction-end-side.svg?react"
import ArrowDirectionStartEndSide from "../../icons/yajirushi-mode-arrow-direction-start-and-end.svg?react"

type LabelData = {
    arrowDirection: ArrowDirection
    children: ReactNode
}

const LabelArrowDirectionPair: LabelData[] = [
    { arrowDirection: 'startSide', children: <ArrowDirectionStartSideSvg className="svg-color" /> },
    { arrowDirection: 'endSide', children: <ArrowDirectionEndSide className="svg-color" /> },
    { arrowDirection: 'startAndEndSide', children: <ArrowDirectionStartEndSide className="svg-color" /> },
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
    const { t } = useTranslation()

    return (
        <div className="flex flex-row items-center p-1 space-x-1">
            <ArrowDirectionStartSideSvg className="svg-color" />
            <p className="flex-1 text-base text-content-light dark:text-content-dark">
                {t('arrowsetting.arrowdirection.title')}
            </p>
            <div className="flex-1">
                <ArrowDirectionSelection
                    current={arrowDirection}
                    onChange={onChange} />
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
                    const selectStyle = labelData.arrowDirection === current ? 'border-primary-light dark:border-primary-dark border-4' : 'border-content-light dark:border-content-dark border-[1px]'
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