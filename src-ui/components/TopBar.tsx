import { useState } from "react"
import { useTranslation } from "react-i18next"
import SettingOpenSvg from "../icons/yajirushi-mode-setting-open.svg?react"
import SettingCloseSvg from "../icons/yajirushi-mode-setting-close.svg?react"

/** 一番上のバー */
function TopBar() {
    const { t } = useTranslation()
    const [isOpenSetting, setIsOpenSetting] = useState(false)

    return (
        <div className="flex flex-col">
            <div className="flex flex-row p-1 items-center bg-primary-light dark:placeholder-primary-dark">
                <p className="flex flex-1 text-xl text-background-light dark:text-background-dark">
                    {t('topbar.title')}
                </p>
                <button
                    className="rounded-xl px-2 bg-background-light dark:bg-background-dark"
                    onClick={() => setIsOpenSetting(!isOpenSetting)}>
                    {
                        isOpenSetting
                            ? <SettingCloseSvg className="svg-color" />
                            : <SettingOpenSvg className="svg-color" />
                    }
                </button>
            </div>

            {isOpenSetting && <SettingList />}
        </div>
    )
}

/** 設定UI */
function SettingList() {
    return (
        <div className="flex flex-col">
            <SettingChangeLanguage />
            <SettingOpenSource />
            <div className="w-full border-b-[1px] border-content-light dark:border-content-dark" />
        </div>
    )
}

/** 言語選択 */
function SettingChangeLanguage() {
    const { t, i18n } = useTranslation()

    function changeLanguage(lang: string) {
        i18n.changeLanguage(lang)
    }

    return (
        <div className="flex flex-row p-2 items-center">
            <p className="flex-1">
                {t('topbar.setting.language.title')}
            </p>
            <select
                value={i18n.language}
                onChange={(ev) => changeLanguage(ev.target.value)}
                className="flex-1">
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
        <div className="flex flex-row p-2 items-center">
            <a
                className="underline"
                href="https://github.com/takusan23/yajirushi-mode"
                target="_blank"
                rel="noopener noreferrer">
                {t('topbar.setting.github')}
            </a>
        </div>
    )
}

export default TopBar