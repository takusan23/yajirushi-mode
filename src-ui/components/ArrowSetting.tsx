import { Node } from "../../src-common/MessageTypes";
import NodeLineDirection from "./NodeLineDirection";
import useArrowSetting from "../hooks/useArrowSetting";
import RequiredLine from "./RequiredLine";

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
    const { startNodeDirection, endNodeDirection, requiredLine, setDirection, setRequiredLine, postCreateArrowMessage } = useArrowSetting(startNode, endNode)

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
                <RequiredLine
                    requiredLine={requiredLine}
                    onChange={(value) => setRequiredLine(value)} />
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
                <p>{`X = ${node.position.x} Y = ${node.size.height}`}</p>
            </div>
        </div>
    )
}

export default ArrowSetting