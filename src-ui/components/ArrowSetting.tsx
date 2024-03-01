import { Node } from "../../src-common/MessageTypes";
import NodeLineDirection from "./setting/NodeLineDirection";
import useArrowSetting from "../hooks/useArrowSetting";
import RequiredLine from "./setting/RequiredLine";
import ArrowDirection from "./setting/ArrowDirection";

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
        setDirection,
        setRequiredLine,
        setArrowDirection,
        postCreateArrowMessage
    } = useArrowSetting(startNode, endNode)

    return (
        <div className="flex flex-col space-y-2 py-2">

            <NodeInfo node={startNode} />
            <NodeInfo node={endNode} />

            <div className="flex flex-row justify-center space-x-2">
                <NodeLineDirection
                    direction={startNodeDirection}
                    onChange={(direction) => setDirection(direction, endNodeDirection)} />
                <NodeLineDirection
                    direction={endNodeDirection}
                    onChange={(direction) => setDirection(startNodeDirection, direction)} />
            </div>

            <div className="flex flex-row justify-center space-x-2">
                <RequiredLine
                    requiredLine={requiredLine}
                    onChange={setRequiredLine} />
                <ArrowDirection
                    arrowDirection={arrowDirection}
                    onChange={setArrowDirection} />
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