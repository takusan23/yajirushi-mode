import { useEffect, useState } from "react"
import { ArrowDirection, CreateArrow, Direction, Node, Position } from "../../src-common/MessageTypes"
import FigmaUiMessageTool from "../tools/FigmaUiMessageTool"
import { SelectNodeOrientation } from "../components/arrowsetting/NodeDirection"

/** ArrowSetting コンポーネントで使うカスタムフック。ロジックをあんまり書くのもあれかなと思い、、、 */
function useArrowSetting(startNode: Node, endNode: Node) {
    const [startNodeDirection, setStartNodeDirection] = useState<Direction>('right')
    const [endNodeDirection, setEndNodeDirection] = useState<Direction>('left')
    const [requiredLine, setRequiredLine] = useState(50)
    const [arrowDirection, setArrowDirection] = useState<ArrowDirection>('endSide')
    const [lineWeight, setLineWeight] = useState(10)
    const [cornerRadius, setCornerRadius] = useState(25)
    const [selectNodeOrientation, setSelectNodeOrientation] = useState<SelectNodeOrientation>({ orientation: 'horizontal', left: 'start', right: 'end' })

    // ノード（アイテム）の並び順を予想して、UI 側でも大体そうなるようにする
    useEffect(() => {
        setSelectNodeOrientation(analyzeSelectNodeOrientation(startNode, endNode))
    }, [startNode, endNode])

    /** 矢印の線を引き始める際に、線を出すのはどの方角からか、線を受け取るのはどの方角からかを設定する。*/
    function setDirection(
        start: Direction,
        end: Direction
    ) {
        setStartNodeDirection(start)
        setEndNodeDirection(end)
    }

    /** 線を引くリクエストを Figma プラグイン側へ投げる */
    function postCreateArrowMessage() {
        // 線を書き始める位置
        const startPosition = createPositionFromDirection(startNode, startNodeDirection)
        // 線を書き終える位置
        const endPosition = createPositionFromDirection(endNode, endNodeDirection)

        const createArrow: CreateArrow = {
            event: 'create_arrow',
            start: startPosition,
            end: endPosition,
            requiredLine: requiredLine,
            startDirection: startNodeDirection,
            endDirection: endNodeDirection,
            arrowDirection: arrowDirection,
            lineWeight: lineWeight,
            cornerRadius: cornerRadius
        }
        FigmaUiMessageTool.postMessage(createArrow)
    }

    return {
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
    }
}

/** 選択したノード（アイテム）の並び方を判定する */
function analyzeSelectNodeOrientation(startNode: Node, endNode: Node) {
    // 方角を出す
    const orientation = (Math.abs(startNode.position.x - endNode.position.x) < Math.abs(startNode.position.y - endNode.position.y))
        ? 'vertical'
        : 'horizontal'

    // Figma のキャンバスと同じ様な並び方にする
    let nodeDirectionPreview: SelectNodeOrientation
    // Figma の座標系は上に向けてマイナスになる←！！！
    if (orientation === 'vertical') {
        // 縦
        if (startNode.position.y < endNode.position.y) {
            // start のが上
            nodeDirectionPreview = {
                orientation: orientation,
                top: 'start',
                bottom: 'end'
            }
        } else {
            // start のが下
            nodeDirectionPreview = {
                orientation: orientation,
                top: 'end',
                bottom: 'start'
            }
        }
    } else {
        // 横
        if (startNode.position.x < endNode.position.x) {
            // start のが左
            nodeDirectionPreview = {
                orientation: orientation,
                left: 'start',
                right: 'end'
            }
        } else {
            // start のが右
            nodeDirectionPreview = {
                orientation: orientation,
                left: 'end',
                right: 'start'
            }
        }
    }

    return nodeDirectionPreview
}

/** 方角と位置とサイズを下に、線の引き始め、線の引き終わり位置を出す */
function createPositionFromDirection(node: Node, direction: Direction): Position {
    let position: Position
    switch (direction) {
        case "top":
            position = {
                x: node.position.x + (node.size.width / 2),
                y: node.position.y
            }
            break
        case "bottom":
            position = {
                x: node.position.x + (node.size.width / 2),
                y: node.position.y + node.size.height
            }
            break
        case "left":
            position = {
                x: node.position.x,
                y: node.position.y + (node.size.height / 2)
            }
            break
        case "right":
            position = {
                x: node.position.x + node.size.width,
                y: node.position.y + (node.size.height / 2)
            }
            break
    }
    return position
}

export default useArrowSetting