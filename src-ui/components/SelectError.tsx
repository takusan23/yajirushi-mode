
/** アイテム（ノード）選択エラー時に出すコンポーネント。2つ以上選んだとか */
function SelectError() {
    return (
        <div className="flex flex-col space-y-2 items-center justify-center text-center">
            <p className="text-xl text-red-500">アイテム（図形、ノード）が選択されていません。</p>
            <p>一つずつ選択するか、ゆっくり選択してみてください。</p>
            <p>よろしくおねがいします。</p>
        </div>
    )
}

export default SelectError