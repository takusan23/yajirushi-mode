import { MessageTypes } from "./MessageTypes";

/** src-ui/FigmaUiMessageTool、src-plugin/FigmaPluginMessageTool のインターフェース */
export default abstract class FigmaMessageInterface {

    /**
     * メッセージを Plugin・UI へ投げる
     * @param message 
     */
    static postMessage(message: MessageTypes) {
        // extends ...
    }

    /**
     * Plugin・UI から着たメッセージを受け取る
     * @param on 
     */
    static receiveMessage(receive: ((message: MessageTypes) => void)) {
        // extends ...
    }

}