import { useState } from "react"
import { useTranslation } from "react-i18next"
import SettingOpenSvg from "../icons/yajirushi-mode-setting-open.svg?react"
import SettingCloseSvg from "../icons/yajirushi-mode-setting-close.svg?react"

/** TopBar に渡す Props */
type TopBarProps = {
    /** 言語変化時に呼ばれる */
    onLangChange: (lang: string) => void
    /** リセットボタンを押したら */
    onSettingReset: () => void
}

/** 一番上のバー */
function TopBar({ onLangChange, onSettingReset }: TopBarProps) {
    const { t } = useTranslation()
    const [isOpenSetting, setIsOpenSetting] = useState(false)

    return (
        <div className="flex flex-col">
            <div className="flex flex-row py-1 px-2 items-center">
                <p className="flex flex-1 text-xl text-primary-light dark:text-primary-dark">
                    {t('topbar.title')}
                </p>
                <button onClick={() => setIsOpenSetting(!isOpenSetting)}>
                    {
                        isOpenSetting
                            ? <SettingCloseSvg className="svg-color" />
                            : <SettingOpenSvg className="svg-color" />
                    }
                </button>
            </div>

            {
                isOpenSetting && <SettingList
                    onLangChange={onLangChange}
                    onSettingReset={onSettingReset} />
            }
        </div>
    )
}
/** SettingList へ渡す Props */
type SettingListProps = SettingChangeLanguageProps & SettingResetSavedSettingProps

/** 設定UI */
function SettingList({ onLangChange, onSettingReset }: SettingListProps) {
    return (
        <div className="flex flex-col">
            <SettingChangeLanguage onLangChange={onLangChange} />
            <SettingResetSavedSetting onSettingReset={onSettingReset} />
            <SettingOpenSource />
            <div className="w-full border-b-[1px] border-content-light dark:border-content-dark" />
        </div>
    )
}

/** SettingResetSavedSetting へ渡す Props */
type SettingResetSavedSettingProps = {
    /** リセットボタンを押したら */
    onSettingReset: () => void
}

/** 設定をリセットボタン */
function SettingResetSavedSetting({ onSettingReset }: SettingResetSavedSettingProps) {
    const { t } = useTranslation()

    return (
        <div className="flex flex-row p-2">
            <button
                className="flex flex-row py-1 px-2 rounded-full mx-5 border-2 border-primary-light dark:border-primary-dark text-content-light dark:text-content-dark"
                onClick={onSettingReset}>
                {t('topbar.setting.resetsetting')}
            </button>
        </div>
    )
}

/** SettingChangeLanguage へ渡す Props */
type SettingChangeLanguageProps = {
    /** 変化時に呼ばれる */
    onLangChange: (lang: string) => void
}

/** 言語選択 */
function SettingChangeLanguage({ onLangChange }: SettingChangeLanguageProps) {
    const { t, i18n } = useTranslation()

    return (
        <div className="flex flex-row p-2">
            <p className="flex-1 text-content-light dark:text-content-dark">
                {t('topbar.setting.language.title')}
            </p>
            <select
                className="flex-1 rounded-sm border-2 focus:outline-none border-content-light dark:border-content-dark bg-background-light dark:bg-background-dark text-content-light dark:text-content-dark"
                value={i18n.language}
                onChange={(ev) => onLangChange(ev.target.value)}>
                <option value='ja'>
                    {t('topbar.setting.language.ja')}
                </option>
                <option value='en'>
                    {t('topbar.setting.language.en')}
                </option>
            </select>
        </div>
    )
}

/** ソースコードを開く */
function SettingOpenSource() {
    const { t } = useTranslation()

    return (
        <div className="flex flex-row p-2">
            <a
                className="underline text-content-light dark:text-content-dark"
                href="https://github.com/takusan23/yajirushi-mode"
                target="_blank"
                rel="noopener noreferrer">
                {t('topbar.setting.github')}
            </a>
        </div>
    )
}

export default TopBar