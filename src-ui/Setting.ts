import { ArrowDirectionType, Direction } from "../src-common/MessageTypes"

/**
 * 永続化させる設定内容。これは、Figma Plugin 側へ投げて、Plugin API の ClientStorage で保存してもらう。
 * JSON で保存するためシリアライズできる形式じゃないとだめ。
 */
export type Setting = {
    /** 言語 */
    language?: string
    /** 矢印を書く際に次回に引き継げるように */
    arrowSettingData?: ArrowSettingData
}

/** 矢印を書く際の値 */
export type ArrowSettingData = {
    /** 矢印のスタート方向。この方角から矢印が書かれる。 */
    startDirection: Direction
    /** 矢印のゴール方向。この方向へ向けて矢印が向かってくる。 */
    endDirection: Direction
    /** 矢印を書き始める際、右左折が必要な場合でも、この値までは真っすぐ突き進んでほしいか。 */
    requiredLine: number
    /** 線の太さ */
    lineWeight: number
    /** 角丸（角の半径） */
    cornerRadius: number
    /** 矢印の向き先。start 側につけるか、stop 側につけるか */
    arrowDirectionType: ArrowDirectionType
}