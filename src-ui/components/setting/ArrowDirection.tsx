import { ArrowDirection } from "../../../src-common/MessageTypes"

type LabelData = {
    label: string,
    arrowDirection: ArrowDirection
}

const LabelArrowDirectionPair: LabelData[] = [
    { label: '開始側', arrowDirection: 'startSide' },
    { label: '終了側', arrowDirection: 'endSide' },
    { label: '両方', arrowDirection: 'startAndEndSide' }
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
        <div className="flex flex-col w-20">
            <p>矢印をつける側</p>
            {
                LabelArrowDirectionPair.map((labelData) => (<>
                    <label key={labelData.arrowDirection}>
                        <input
                            type="radio"
                            value={labelData.label}
                            checked={labelData.arrowDirection === arrowDirection}
                            onChange={() => onChange(labelData.arrowDirection)}
                        />
                        {labelData.label}
                    </label>
                </>))
            }
        </div>
    )
}

export default ArrowDirection