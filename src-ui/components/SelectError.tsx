import ErrorSvg from "../icons/yajirushi-mode-select_error.svg?react" // svgr で svg を react コンポーネントとして使えるように

/** アイテム（ノード）選択エラー時に出すコンポーネント。2つ以上選んだとか */
function SelectError() {
    return (
        <div className="flex flex-col space-y-2 p-2 items-center justify-center text-center">
            <ErrorSvg className="w-full h-1/3" />
            <p className="text-lg text-red-500">図形などが選択されていません。</p>
            <p>一つずつ選択するか、ゆっくり選択してみてください。</p>
        </div>
    )
}

export default SelectError