import { useState } from "react";
import { CreateArrow, Node, Position } from "../../src-common/MessageTypes";
import NodeLineDirection from "./NodeLineDirection";
import Direction from "../data/Direction";

/** ArrowSetting に渡す Props */
type ArrowSettingProps = {
    /** 最初のアイテム */
    firstNode: Node,
    /** 最初のアイテム */
    secondNode: Node,
    onCreateArrow: (message: CreateArrow) => void
}

/** 矢印の設定コンポーネント */
function ArrowSetting({ firstNode, secondNode, onCreateArrow }: ArrowSettingProps) {

    const [firstNodeDirection, setFirstNodeDirection] = useState<Direction>('right')
    const [secondNodeDirection, setSecondNodeDirection] = useState<Direction>('left')

    return (
        <div className="flex flex-col space-y-2">

            <NodeInfo node={firstNode} />
            <NodeInfo node={secondNode} />

            <div className="flex flex-row justify-center space-x-2">
                <NodeLineDirection direction={firstNodeDirection} onChange={setFirstNodeDirection} />
                <NodeLineDirection direction={secondNodeDirection} onChange={setSecondNodeDirection} />
            </div>

            <button
                className="rounded-md border-blue-300 border-2 mx-5"
                onClick={() => {

                    const start: Position = {
                        x: firstNode.position.x + firstNode.size.width,
                        y: firstNode.position.y + firstNode.size.height / 2
                    }
                    const end: Position = {
                        x: secondNode.position.x,
                        y: secondNode.position.y + (secondNode.size.height / 2)
                    }

                    const createArrow: CreateArrow = {
                        event: 'create_arrow',
                        start: start,
                        end: end,
                        direction: 'firstToSecond'
                    }
                    onCreateArrow(createArrow)
                }}>
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