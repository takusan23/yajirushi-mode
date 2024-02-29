import FigmaMessageInterface from "../src-common/FigmaMessageInterface";
import { MessageTypes } from "../src-common/MessageTypes";

/**
 * UI側のメッセージを受け取ったり、UI側へメッセージを送ったりする
 * プラグイン側専用。Figma UI 側は {@link FigmaUiMessageTool}
 */
export default class FigmaPluginMessageTool extends FigmaMessageInterface {

    static postMessage(message: MessageTypes): void {
        figma.ui.postMessage(JSON.stringify(message))
    }

    static receiveMessage(receive: (message: MessageTypes) => void): void {
        figma.ui.onmessage = (message) => {
            receive(JSON.parse(message) as MessageTypes)
        }
    }

}