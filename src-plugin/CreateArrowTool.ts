import { CreateArrow } from "../src-common/MessageTypes"
import DrawLineAlgorithmTool from "./DrawLineAlgorithmTool"

/** 線を引くための処理 */
class CreateArrowTool {

    /**
     * CreateArrow を元に矢印を引く
     * @param createArrow 
     */
    static async createArrow(createArrow: CreateArrow) {

        // 線の開始、終了、折れ曲がる点を出す
        const generateRoutePositionList = DrawLineAlgorithmTool.generateRoute(createArrow)
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

        // TODO 公開前に消す
        // console.log(createArrow)
        // console.log(generateRoutePositionList)

        const lineVector = figma.createVector()

        // 矢印を追加するためには、VectorPath ではなく、VectorNetwork を使って、最後（or 最初）のストロークに矢印をつける必要があるらしい。
        // が、SVG の data を VectorNetwork にするのは面倒なので、
        // vectorPaths に入れたあとに出てくる、vectorNetwork をディープコピーして矢印をつけることにする
        lineVector.vectorPaths = [{
            windingRule: 'NONE',
            data: svgPathData
        }]

        // VectorNetwork を使ってストロークに矢印をつける
        const arrowDirection = createArrow.arrowDirection
        const vertices: VectorVertex[] = lineVector.vectorNetwork.vertices
            .map((stroke, index) => {
                if (index === 0 && (arrowDirection === 'startSide' || arrowDirection === 'startAndEndSide')) {
                    // 開始側に矢印をつける
                    return { ...stroke, strokeCap: 'ARROW_LINES' }
                } else if (index === lineVector.vectorNetwork.vertices.length - 1 && (arrowDirection === 'endSide' || arrowDirection === 'startAndEndSide')) {
                    // 終了側につける
                    return { ...stroke, strokeCap: 'ARROW_LINES' }
                } else {
                    return stroke
                }
            })

        // VectorNetwork をセットする
        await lineVector.setVectorNetworkAsync({
            ...lineVector.vectorNetwork,
            vertices: vertices
        })

        // 最後に cornerRadius しないと、途中で上書きされる？
        // strokeWeight もついでに
        lineVector.strokeWeight = createArrow.lineWeight
        lineVector.cornerRadius = createArrow.cornerRadius
        
        figma.currentPage.appendChild(lineVector)
    }
}

export default CreateArrowTool