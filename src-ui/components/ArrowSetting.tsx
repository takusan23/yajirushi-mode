import { useState } from "react";
import { CreateArrow, Node, Position } from "../../src-common/MessageTypes";
import NodeLineDirection from "./NodeLineDirection";
import Direction from "../data/Direction";
import useArrowSetting from "../hooks/useArrowSetting";

/** ArrowSetting に渡す Props */
type ArrowSettingProps = {
    /** 最初のアイテム */
    firstNode: Node,
    /** 最初のアイテム */
    secondNode: Node,
}

/** 矢印の設定コンポーネント */
function ArrowSetting({ firstNode, secondNode }: ArrowSettingProps) {

    // ロジックをカスタムフックに切り出した。クソ長くなったので、、
    const { firstNodeDirection, secondNodeDirection, setDirection, postCreateArrowMessage } = useArrowSetting(firstNode, secondNode)

    return (
        <div className="flex flex-col space-y-2">

            <NodeInfo node={firstNode} />
            <NodeInfo node={secondNode} />

            <div className="flex flex-row justify-center space-x-2">
                <NodeLineDirection
                    direction={firstNodeDirection}
                    onChange={(direction) => setDirection(direction, secondNodeDirection)} />
                <NodeLineDirection
                    direction={secondNodeDirection}
                    onChange={(direction) => setDirection(firstNodeDirection, direction)} />
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