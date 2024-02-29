import FigmaMessageInterface from "../../src-common/FigmaMessageInterface";
import { MessageTypes } from "../../src-common/MessageTypes";

/**
 * プラグイン側のメッセージを受け取ったり、プラグイン側へメッセージを送ったりする。
 * UI 側専用。Figma プラグイン側は {@link FigmaPluginMessageTool}
 */
export default class FigmaUiMessageTool extends FigmaMessageInterface {

    static postMessage(message: MessageTypes): void {
        parent.postMessage({ pluginMessage: JSON.stringify(message) }, '*')
    }

    static receiveMessage(receive: (message: MessageTypes) => void): void {
        window.onmessage = (event) => { receive(JSON.parse(event.data.pluginMessage) as MessageTypes) }
    }
}
