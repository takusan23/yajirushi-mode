import { CreateArrow, Position } from "../src-common/MessageTypes";

class DrawLineAlgorithm {

    /** 二つの座標を直線ではなく、右左折を繰り返して結ぶ関数 */
    static generateRoute(createArrow: CreateArrow): Position[] | null {

        // 2点間を線で結ぶルールは上から順番にこう。
        // start / end の X もしくは Y が同じ場合 → 真っ直ぐ。
        // start / end が同じ方向から出ている場合 → U字で繋ぐ。
        // start / end でそれぞれ棒を伸ばして、ぶつかった場合 → 1回折れ曲がる線を書く。
        // start / end でそれぞれ棒を伸ばして、かつ中間点を取って、その点から十字の線を引き、線にぶつかれば → 2回折れ曲がる線を書く。
        // それ以外は諦める。ごめん。

        // Figma の座標系は、上に行くにつれてマイナスになる
        // 右に行くほど + になるはそう。

        const {
            start,
            end,
            startDirection,
            endDirection,
            requiredLine,
            arrowDirection
        } = createArrow

        // todo console.log 消す

        // 同じ方向から出る線の場合
        if (startDirection === endDirection) {
            console.log('uLine')
            return this.uLine(createArrow)
        }

        // 直線でいい場合
        if (start.x == end.x || start.y == end.y) {
            console.log('linearLine')
            return this.linearLine(createArrow)
        }

        // 一回の右左折で完結する場合
        const oneTurnLineOrNull = this.oneTurnLine(createArrow)
        if (oneTurnLineOrNull) {
            console.log('oneTurnLine')
            return oneTurnLineOrNull
        }

        // 2回右左折する必要がある
        const twoTurnLineOrNull = this.twoTurnLine(createArrow)
        if (twoTurnLineOrNull) {
            console.log('twoTurnLine')
            return twoTurnLineOrNull
        }

        // だめ
        return null
    }

    /** 2回折れ曲がる線で描けるかどうか。書けない場合は null */
    private static twoTurnLine(createArrow: CreateArrow): Position[] | null {
        const { x: startX, y: startY } = createArrow.start
        const { x: endX, y: endY } = createArrow.end

        // ノードから真っ直ぐ確保する長さ
        const requiredStartX = this.isNegative(createArrow.start.x) ? (createArrow.start.x - createArrow.requiredLine) : (createArrow.start.x + createArrow.requiredLine)
        const requiredStartY = this.isNegative(createArrow.start.y) ? (createArrow.start.y - createArrow.requiredLine) : (createArrow.start.y + createArrow.requiredLine)
        const requiredEndX = this.isNegative(createArrow.end.x) ? (createArrow.end.x - createArrow.requiredLine) : (createArrow.end.x + createArrow.requiredLine)
        const requiredEndY = this.isNegative(createArrow.end.y) ? (createArrow.end.y - createArrow.requiredLine) : (createArrow.end.y + createArrow.requiredLine)

        // 中間点
        const centerX = requiredStartX + (requiredEndX - requiredStartX)
        const centerY = requiredStartY + (requiredEndY - requiredStartY)

        // 出発して、中間点に折れ曲がる点を出す
        let startToCenterTurnPosition: Position
        switch (createArrow.startDirection) {
            case "top":
                startToCenterTurnPosition = { x: requiredStartX, y: centerY }
            case "bottom":
                startToCenterTurnPosition = { x: requiredStartX, y: centerY }
            case "left":
                startToCenterTurnPosition = { x: centerX, y: requiredStartY }
            case "right":
                startToCenterTurnPosition = { x: centerX, y: requiredStartY }
        }

        // 終了側でも同じく中間点まで折れ曲がる点を
        let endToCenterTurnPosition: Position
        switch (createArrow.startDirection) {
            case "top":
                endToCenterTurnPosition = { x: requiredEndX, y: centerY }
            case "bottom":
                endToCenterTurnPosition = { x: requiredEndX, y: centerY }
            case "left":
                endToCenterTurnPosition = { x: centerX, y: requiredEndY }
            case "right":
                endToCenterTurnPosition = { x: centerX, y: requiredEndY }
        }

        // 中間点から縦と横に棒を伸ばして、ぶつかること
        const centerToTopLine: Position = { x: centerX, y: Math.max(requiredStartY, requiredEndY) }
        const centerToBottomLine: Position = { x: centerX, y: Math.min(requiredStartY, requiredEndY) }
        const centerToLeftLine: Position = { x: Math.min(requiredStartX, requiredEndX), y: centerY }
        const centerToRightLine: Position = { x: Math.max(requiredStartX, requiredEndX), y: centerY }
        const centerToLineList = [centerToTopLine, centerToBottomLine, centerToLeftLine, centerToRightLine]

        // ぶつかること
        if (
            centerToLineList.some((position) => startToCenterTurnPosition.x === position.x && startToCenterTurnPosition.y === position.y)
            && centerToLineList.some((position) => endToCenterTurnPosition.x === position.x && endToCenterTurnPosition.y === position.y)
        ) {
            // 開始、折れ曲がる点、折れ曲がる点、終了位置
            return [
                { x: startX, y: startY },
                startToCenterTurnPosition,
                endToCenterTurnPosition,
                { x: endX, y: endY }
            ]
        } else {
            // ぶつからない
            return null
        }
    }

    /** 1回折れ曲がる線で描けるか。書けない場合は null */
    private static oneTurnLine(createArrow: CreateArrow): Position[] | null {
        const { x: startX, y: startY } = createArrow.start
        const { x: endX, y: endY } = createArrow.end

        // 出発して折り曲がる点を出す
        let startToTurnPosition: Position
        switch (createArrow.startDirection) {
            case "top":
                startToTurnPosition = { x: startX, y: endY }
                break
            case "bottom":
                startToTurnPosition = { x: startX, y: endY }
                break
            case "left":
                startToTurnPosition = { x: endX, y: startY }
                break
            case "right":
                startToTurnPosition = { x: endX, y: startY }
                break
        }

        // こっちでも
        let endToTurnPosition: Position
        switch (createArrow.endDirection) {
            case "top":
                endToTurnPosition = { x: endX, y: startY }
                break
            case "bottom":
                endToTurnPosition = { x: endX, y: startY }
                break
            case "left":
                endToTurnPosition = { x: startX, y: endY }
                break
            case "right":
                endToTurnPosition = { x: startX, y: endY }
                break
        }

        // 折れ曲がる点が開始位置から見ても、終了位置絡みても同じ場合は、一回折れ曲がることで線を結べる
        if (startToTurnPosition.x === endToTurnPosition.x && startToTurnPosition.y === endToTurnPosition.y) {
            // 開始、折れ曲がる点、終了をセット
            return [
                { x: startX, y: startY },
                startToTurnPosition, // endToTurnPosition と同じです
                { x: endX, y: endY }
            ]
        } else {
            // ここで違う場合は null を返して一回折れ曲がる線では書けないことを返す
            return null
        }
    }

    /** 直線を引く */
    private static linearLine(createArrow: CreateArrow): Position[] {
        // スタート
        const { x: startX, y: startY } = createArrow.start
        // ゴール
        const { x: endX, y: endY } = createArrow.end
        // 中間点
        const centerX = startX + (endX - startX)
        const centerY = startY + (endY - startY)

        // SVG にする都合上、多分中間点を入れないとパスが足りない？
        return [
            { x: startX, y: startY },
            { x: centerX, y: centerY },
            { x: endX, y: endY }
        ]
    }

    /** U字 */
    private static uLine(createArrow: CreateArrow): Position[] {
        const { x: startX, y: startY } = createArrow.start
        const { x: endX, y: endY } = createArrow.end
        const requiredLine = createArrow.requiredLine

        // 折れ曲がる点を出す
        // 座標系は上に向けてマイナスになるので注意
        let firstTurn: Position
        let secondTurn: Position
        switch (createArrow.startDirection) { // direction が同じなので start でも end でもどっちでも良い
            case "top":
                firstTurn = { x: startX, y: Math.min(startY - requiredLine, endY - requiredLine) }
                secondTurn = { x: endX, y: firstTurn.y }
                break
            case "bottom":
                firstTurn = { x: startX, y: Math.max(startY + requiredLine, endY + requiredLine) }
                secondTurn = { x: endX, y: firstTurn.y }
                break
            case "left":
                firstTurn = { x: Math.min(startX - requiredLine, endX - requiredLine), y: startY }
                secondTurn = { x: firstTurn.x, y: endY }
                break
            case "right":
                firstTurn = { x: Math.max(startX + requiredLine, endX + requiredLine), y: startY }
                secondTurn = { x: firstTurn.x, y: endY }
                break
        }

        return [
            { x: startX, y: startY },
            firstTurn,
            secondTurn,
            { x: endX, y: endY }
        ]
    }

    private static isNegative(value: number): boolean {
        return value < -1
    }

}

export default DrawLineAlgorithm