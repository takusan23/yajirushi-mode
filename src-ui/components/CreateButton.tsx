import { useTranslation } from "react-i18next";
import CreateArrowSvg from "../icons/yajirushi-mode-create-arrow.svg?react";

/** CreateButton へ渡す Props */
type CreateButtonProps = {
    /** 押した時に呼ばれる */
    onClick: () => void
}

/** 作成ボタン */
function CreateButton({ onClick }: CreateButtonProps) {
    const { t } = useTranslation()

    return (
        <button
            className="flex flex-row justify-center items-center rounded-full mx-5 border-4 border-primary-light dark:border-primary-dark text-content-light dark:text-content-dark"
            onClick={onClick}>
            <CreateArrowSvg className="svg-color" />
            {t('createbutton.text')}
        </button>
    )
}

export default CreateButton