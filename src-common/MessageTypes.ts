// Figma Plugin - UI 側で postMessage 経由でやり取りする際の型一覧。
// シリアライズできる必要があります！！！
// src-plugin と src-ui で使うのでなんか変な位置にこのファイルがある

/** 座標を表す */
export type Position = {
    /** X 座標 */
    x: number,
    /** Y 座標 */
    y: number
}

/** サイズを表す */
export type Size = {
    /** 幅 */
    width: number,
    /** 高さ */
    height: number
}

/** アイテム（ノード）の座標とサイズ */
export type Node = {
    /** Figma の Node ID */
    id: string,
    /** 座標 */
    position: Position,
    /** サイズ */
    size: Size
}

/** 向きを表す */
export type Direction = 'top' | 'bottom' | 'left' | 'right'

/** 2つのアイテム（ノード）を選択したら呼ばれる */
export type SelectNodes = {
    event: 'select_node',
    /** 1個目のノード */
    startNode: Node,
    /** 2個目のノード */
    endNode: Node
}

/** アイテム選択が解除された、もしくは2つ以上選んだ */
export type UnSelectNodes = {
    event: 'unselect_node'
}

/** 矢印を作る */
export type CreateArrow = {
    event: 'create_arrow',
    /** 矢印のスタート位置。 */
    start: Position,
    /** 矢印のゴール位置 */
    end: Position,
    /** 矢印のスタート方向。この方角から矢印が書かれる。 */
    startDirection: Direction,
    /** 矢印のゴール方向。この方向へ向けて矢印が向かってくる。 */
    endDirection: Direction,
    /** 矢印を書き始める際、右左折が必要な場合でも、この値までは真っすぐ突き進んでほしいか。 */
    requiredLine: number,
    /** 矢印の向き先。start 側につけるか、stop 側につけるか */
    arrowDirection: 'endSide' | 'startSide'
}

/** やり取りできる型のユニオン！ */
export type MessageTypes =
    SelectNodes
    | UnSelectNodes
    | CreateArrow