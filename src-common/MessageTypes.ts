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

/** 2つのアイテム（ノード）を選択したら呼ばれる */
export type SelectNodes = {
    event: 'select_node',
    /** 1個目のノード */
    firstNode: Node,
    /** 2個目のノード */
    secondNode: Node
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
    /** 矢印の向き先。first → second か、second → first か */
    direction: 'firstToSecond' | 'secondToFirst'
}

/** やり取りできる型のユニオン！ */
export type MessageTypes =
    SelectNodes
    | UnSelectNodes
    | CreateArrow