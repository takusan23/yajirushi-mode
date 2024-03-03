import { useTranslation } from "react-i18next";
import { Node } from "../../src-common/MessageTypes";
import useArrowSetting from "../hooks/useArrowSetting";
import ArrowDirection from "./arrowsetting/ArrowDirection";
import CommonInput from "./arrowsetting/CommonInput";
import NodeDirection from "./arrowsetting/NodeDirection";
import LineWeightSvg from "../icons/yajirushi-mode-line-weight.svg?react";
import CornerRadiusSvg from "../icons/yajirushi-mode-corner-radius.svg?react";
import RequireLineSvg from "../icons/yajirushi-mode-require-line.svg?react";
import CreateButton from "./CreateButton";

/** ArrowSetting に渡す Props */
type ArrowSettingProps = {
    /** 開始側のノード（アイテム） */
    startNode: Node,
    /** 終了側のノード（アイテム） */
    endNode: Node,
}

/** 矢印の設定コンポーネント */
function ArrowSetting({ startNode, endNode }: ArrowSettingProps) {
    // i18next
    const { t } = useTranslation()

    // ロジックをカスタムフックに切り出した。クソ長くなったので、、
    const {
        startNodeDirection,
        endNodeDirection,
        requiredLine,
        arrowDirection,
        lineWeight,
        cornerRadius,
        selectNodeOrientation,
        setDirection,
        setRequiredLine,
        setArrowDirection,
        setLineWeight,
        setCornerRadius,
        postCreateArrowMessage
    } = useArrowSetting(startNode, endNode)

    return (
        <div className="flex flex-col py-2 space-y-2">

            {/* 線をどの方角から出して、どの方角から受け入れるか */}
            <NodeDirection
                selectNodeOrientation={selectNodeOrientation}
                startNodeSize={startNode.size}
                startNodeDirection={startNodeDirection}
                endNodeSize={endNode.size}
                endNodeDirection={endNodeDirection}
                onChange={setDirection} />

            <div className="flex flex-col px-2">
                <ArrowDirection
                    arrowDirection={arrowDirection}
                    onChange={setArrowDirection} />
                <CommonInput
                    title={t('arrowsetting.lineweight.title')}
                    value={lineWeight}
                    icon={<LineWeightSvg className="svg-color" />}
                    onChange={setLineWeight} />
                <CommonInput
                    title={t('arrowsetting.cornerradius.title')}
                    description={t('arrowsetting.cornerradius.description')}
                    icon={<CornerRadiusSvg className="svg-color" />}
                    value={cornerRadius}
                    onChange={setCornerRadius} />
                <CommonInput
                    title={t('arrowsetting.requireline,title')}
                    description={t('arrowsetting.requireline.description')}
                    icon={<RequireLineSvg className="svg-color" />}
                    value={requiredLine}
                    onChange={setRequiredLine} />
            </div>

            <CreateButton onClick={() => postCreateArrowMessage()} />
        </div>
    )
}

export default ArrowSetting