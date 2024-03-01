import { CreateArrow } from "../src-common/MessageTypes"
import DrawLineAlgorithm from "./DrawLineAlgorithm"

/** 線を引くための処理 */
class CreateArrowTool {

    /**
     * CreateArrow を元に矢印を引く
     * @param createArrow 
     */
    static createArrow(createArrow: CreateArrow) {

        // 線の開始、終了、折れ曲がる点を出す
        const generateRoutePositionList = DrawLineAlgorithm.generateRoute(createArrow)
        // 出来ない場合
        if (!generateRoutePositionList) {
            throw Error('経路検索に失敗しました')
        }

        // 線を引く
        // SVG、どうやって書こう、、、
        // 最初は M 、それ以降は L でいいはず？
        const svgPathData = generateRoutePositionList
            .map((position, index) => `${index === 0 ? 'M' : 'L'} ${position.x} ${position.y}`)
            .join(' ')

        console.log(createArrow)
        console.log(generateRoutePositionList)

        const lineVector = figma.createVector()
        lineVector.strokeWeight = 5
        lineVector.vectorPaths = [{
            windingRule: 'NONE',
            data: svgPathData
        }]
        figma.currentPage.appendChild(lineVector)
    }
}

export default CreateArrowTool