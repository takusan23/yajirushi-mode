// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import FigmaPluginMessageTool from "./FigmaPluginMessageTool";
import CreateArrowTool from "./CreateArrowTool";

// メイン関数を呼ぶ
main()

/** メイン関数 */
function main() {
  // React で作った画面 src-ui/index.html を表示する
  // 吐き出し先は dist/index.html です
  // サイズが小さいので縦伸ばしておく
  figma.showUI(__html__, {
    themeColors: true,
    height: 400
  })

  // イベントを購読
  listenUiMessage()
  listenSelectionChange()
}

/** UI 側からのイベントを購読する */
function listenUiMessage() {
  // UI 側からのイベントを捌く
  FigmaPluginMessageTool.receiveMessage((message) => {
    switch (message.event) {
      // 矢印を作る
      case 'create_arrow':
        CreateArrowTool.createArrow(message)
          .catch(() => { console.log('err') })
        break

      // 設定内容を返す
      case 'storage_get_request':
        figma.clientStorage.getAsync('setting')
          .then((setting) => FigmaPluginMessageTool.postMessage({ event: 'storage_update_response', value: setting ?? '{}' }))
        break

      // 設定内容を保存する
      case 'storage_set_request':
        figma.clientStorage.setAsync('setting', message.value)
          .then(() => FigmaPluginMessageTool.postMessage({ event: 'storage_update_response', value: message.value }))
        break
    }
  })
}

/** selectionchange イベントを購読する */
function listenSelectionChange() {
  // 1番目、2番目に選んだアイテム
  let firstSelectNode: SceneNode | null = null
  let secondSelectNode: SceneNode | null = null

  // 2つのアイテム（Node）を選択したかどうか
  figma.on("selectionchange", () => {
    // 複数選択中ならこの配列にアイテム（ノード）が入る
    // 配列のインデックスはランダムなので、それに依存してはいけない。（最初に選択したノードは[0]ではない可能性）
    const selectionList = figma.currentPage.selection
    const selectSize = selectionList.length

    // 選択を解除した
    if (selectSize === 0) {
      firstSelectNode = null
      secondSelectNode = null
    }

    // 1つ目を選んだ
    if (selectSize === 1) {
      firstSelectNode = selectionList[0]
    }

    // 2つ目も選んだ
    if (selectSize === 2) {
      // 配列のインデックスは見てはいけないので、1つ目の ID に一致しないノードを探す
      secondSelectNode = selectionList.find(node => node.id !== firstSelectNode?.id)!
    }

    // 2つ選んでいる状態で
    if (selectSize === 2 && firstSelectNode && secondSelectNode) {
      // 自前の Node オブジェクトに変換して UI 側に通知
      const [first, second] = [firstSelectNode, secondSelectNode].map((node) => ({
        id: node.id,
        position: { x: node.x, y: node.y },
        size: { width: node.width, height: node.height }
      }))
      FigmaPluginMessageTool.postMessage({
        event: 'select_node',
        startNode: first,
        endNode: second
      })
    } else {
      // 選択してない、もしくは2個以上選んだ
      FigmaPluginMessageTool.postMessage({ event: 'unselect_node' })
    }
  })
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
// figma.ui.onmessage = (msg: { type: string, count: number }) => {
//   // One way of distinguishing between different types of messages sent from
//   // your HTML page is to use an object with a "type" property like this.
//   if (msg.type === 'create-rectangles') {
//     const nodes: SceneNode[] = [];
//     for (let i = 0; i < msg.count; i++) {
//       const line = figma.createLine();
//       line.x = i * 150;
//       line.strokes = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]
//       line.strokeCap = 'ARROW_LINES'
//       figma.currentPage.appendChild(line);
//       nodes.push(line);
//     }
//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }

//   // Make sure to close the plugin when you're done. Otherwise the plugin will
//   // keep running, which shows the cancel button at the bottom of the screen.
//   figma.closePlugin();
// };
