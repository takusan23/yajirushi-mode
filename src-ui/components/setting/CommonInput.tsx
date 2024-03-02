import { ReactNode } from "react"

/** CommonInput へ渡す Props */
type CommonInputProps = {
    /** 設定項目の名前 */
    title: string
    /** 説明（あれば、なくても良い） */
    description?: string
    /** アイコン ReactNode */
    icon: ReactNode
    /** 値 */
    value: number
    /** 値が変化したら呼ばれる */
    onChange: (value: number) => void
}

/** 数字を入力するコンポーネント。角丸とか */
function CommonInput({ title, description, icon, value, onChange }: CommonInputProps) {
    return (
        <div className="flex flex-row items-center p-1 space-x-1">
            {icon}
            <div className="flex-1 flex flex-col">
                <p className="flex-1 text-base text-content-light dark:text-content-dark">{title}</p>
                {description && <p className="flex-1 text-sm text-content-light dark:text-content-dark">{description}</p>}
            </div>
            <input
                className="flex-1 min-w-0 pl-2 rounded-sm border-2 focus:outline-none border-content-light dark:border-content-dark bg-background-light dark:bg-background-dark text-content-light dark:text-content-dark"
                type="number"
                value={value}
                onChange={(ev) => onChange(Number(ev.target.value))}
            />
        </div>
    )
}

export default CommonInput