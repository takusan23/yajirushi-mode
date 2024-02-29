import { useState } from "react"
import { CreateArrow, Direction, Node, Position } from "../../src-common/MessageTypes"
import FigmaUiMessageTool from "../tools/FigmaUiMessageTool"

/** ArrowSetting コンポーネントで使うカスタムフック。ロジックをあんまり書くのもあれかなと思い、、、 */
function useArrowSetting(firstNode: Node, secondNode: Node) {
    const [firstNodeDirection, setFirstNodeDirection] = useState<Direction>('right')
    const [secondNodeDirection, setSecondNodeDirection] = useState<Direction>('left')

    /** 矢印の線を引き始める際に、線を出すのはどの方角からか、線を受け取るのはどの方角からかを設定する。*/
    function setDirection(
        start: Direction,
        end: Direction
    ) {
        setFirstNodeDirection(start)
        setSecondNodeDirection(end)
    }

    /** 線を引くリクエストを Figma プラグイン側へ投げる */
    function postCreateArrowMessage() {
        // 線を書き始める位置
        const startPosition = createPositionFromDirection(firstNode, firstNodeDirection)
        // 線を書き終える位置
        const endPosition = createPositionFromDirection(secondNode, secondNodeDirection)

        const createArrow: CreateArrow = {
            event: 'create_arrow',
            start: startPosition,
            end: endPosition,
            direction: 'firstToSecond'
        }
        FigmaUiMessageTool.postMessage(createArrow)
    }

    return {
        firstNodeDirection,
        secondNodeDirection,
        setDirection,
        postCreateArrowMessage
    }
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