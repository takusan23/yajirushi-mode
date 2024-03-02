/**
 * 永続化させる設定内容。これは、Figma Plugin 側へ投げて、Plugin API の ClientStorage で保存してもらう。
 * JSON で保存するためシリアライズできる形式じゃないとだめ。
 */
type Setting = {
    /** 言語 */
    language?: string
}

export default Setting