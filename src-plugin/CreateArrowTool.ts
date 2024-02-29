import { CreateArrow } from "../src-common/MessageTypes"

/** 線を引くための処理 */
class CreateArrowTool {

    /**
     * CreateArrow を元に矢印を引く
     * @param createArrow 
     */
    static createArrow(createArrow: CreateArrow) {

        // スタート
        const startX = createArrow.start.x
        const startY = createArrow.start.y

        // ゴール
        const endX = createArrow.end.x
        const endY = createArrow.end.y

        // 中間点
        const centerX = startX + (endX - startX)
        const centerY = startY + (endY - startY)

        // 線を引く
        // SVG、どうやって書こう、、、
        const data = [
            `M ${startX} ${startY}`,
            `L ${centerX} ${centerY}`,
            `L ${endX} ${endY}`
        ].join(' ')

        console.log(data)
        const lineVector = figma.createVector()
        lineVector.strokeWeight = 5
        lineVector.vectorPaths = [{
            windingRule: 'NONE',
            data: data
        }]
        figma.currentPage.appendChild(lineVector)
    }
}

export default CreateArrowTool