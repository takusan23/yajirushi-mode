import { Node } from "../../src-common/MessageTypes";
import NodeLineDirection from "./setting/NodeLineDirection";
import useArrowSetting from "../hooks/useArrowSetting";
import ArrowDirection from "./setting/ArrowDirection";
import CommonInput from "./setting/CommonInput";

/** ArrowSetting に渡す Props */
type ArrowSettingProps = {
    /** 最初のアイテム */
    startNode: Node,
    /** 最初のアイテム */
    endNode: Node,
}

/** 矢印の設定コンポーネント */
function ArrowSetting({ startNode, endNode }: ArrowSettingProps) {

    // ロジックをカスタムフックに切り出した。クソ長くなったので、、
    const {
        startNodeDirection,
        endNodeDirection,
        requiredLine,
        arrowDirection,
        lineWeight,
        cornerRadius,
        setDirection,
        setRequiredLine,
        setArrowDirection,
        setLineWeight,
        setCornerRadius,
        postCreateArrowMessage
    } = useArrowSetting(startNode, endNode)

    return (
        <div className="flex flex-col py-2">

            {/* 線をどの方角から出して、どの方角から受け入れるか */}
            <div className="flex flex-row justify-evenly space-x-2 py-2">
                <NodeLineDirection
                    index={1}
                    nodeSize={startNode.size}
                    direction={startNodeDirection}
                    onChange={(direction) => setDirection(direction, endNodeDirection)} />
                <NodeLineDirection
                    index={2}
                    nodeSize={endNode.size}
                    direction={endNodeDirection}
                    onChange={(direction) => setDirection(startNodeDirection, direction)} />
            </div>

            <div className="flex flex-col px-2">
                <ArrowDirection
                    arrowDirection={arrowDirection}
                    onChange={setArrowDirection} />
                <CommonInput
                    title="線の太さ"
                    value={lineWeight}
                    onChange={setLineWeight} />
                <CommonInput
                    title="角丸"
                    description="角の半径です"
                    value={cornerRadius}
                    onChange={setCornerRadius} />
                <CommonInput
                    title="直線最低値"
                    description="線が折れ曲がる際に、どれぐらい伸ばしてから折れ曲がるかです。"
                    value={requiredLine}
                    onChange={setRequiredLine} />
            </div>

            <button
                className="rounded-md border-blue-300 border-2 mx-5"
                onClick={() => postCreateArrowMessage()}>
                矢印を作る
            </button>
        </div>
    )
}

type NodeInfoProps = {
    node: Node
}

function NodeInfo({ node }: NodeInfoProps) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row space-x-2">
                <p>サイズ</p>
                <p>{`${node.size.width} x ${node.size.height}`}</p>
            </div>
            <div className="flex flex-row space-x-2">
                <p>位置</p>
                <p>{`X = ${node.position.x} Y = ${node.position.y}`}</p>
            </div>
        </div>
    )
}

export default ArrowSetting