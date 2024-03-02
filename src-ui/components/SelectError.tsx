import { useTranslation } from "react-i18next"
import ErrorSvg from "../icons/yajirushi-mode-select_error.svg?react" // svgr で svg を react コンポーネントとして使えるように

/** アイテム（ノード）選択エラー時に出すコンポーネント。2つ以上選んだとか */
function SelectError() {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col space-y-2 p-2 items-center justify-center text-center">
            <ErrorSvg className="w-full h-1/3 svg-color" />
            <p className="text-lg text-red-500">
                {t('selecterror.message')}
            </p>
            <p className="text-content-light dark:text-content-dark">
                {t('selecterror.description')}
            </p>
        </div>
    )
}

export default SelectError