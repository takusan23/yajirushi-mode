// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import FigmaPluginMessageTool from "./FigmaPluginMessageTool";
import { CreateArrow } from "../src-common/MessageTypes";

// This shows the HTML page in "index.html".
figma.showUI(__html__)

// UI 側からのイベントを捌く
FigmaPluginMessageTool.receiveMessage((message) => {
  switch (message.event) {
    // UI から矢印を作れ命令
    case 'create_arrow':
      createArrow(message)
      break
  }
})

type Position = {
  x: number,
  y: number
}

type Line = {
  start: Position,
  end: Position
}

/**
 * CreateArrow を下に矢印を引く
 * @param createArrow 
 */
function createArrow(createArrow: CreateArrow) {

  // スタート
  const startX = createArrow.start.x
  const startY = createArrow.start.y

  // ゴール
  const endX = createArrow.end.x
  const endY = createArrow.end.y

  // 中間点
  const centerX = startX + (endX - startX)
  const centerY = startY + (endY - startY)

  // 線を引く
  // SVG、どうやって書こう、、、
  const data = [
    `M ${startX} ${startY}`,
    `L ${centerX} ${centerY}`,
    `L ${endX} ${endY}`
  ].join(' ')

  console.log(data)
  const lineVector = figma.createVector()
  lineVector.strokeWeight = 5
  lineVector.vectorPaths = [{
    windingRule: 'NONE',
    data: data
  }]
  figma.currentPage.appendChild(lineVector)
}

// 2つのアイテム（Node）を選択したかどうか
figma.on("selectionchange", () => {
  const selectionList = figma.currentPage.selection
  console.log(selectionList)
  // 2つ以上選んだ、または選んでいないことを UI 側に通知
  const [first, second] = selectionList.map((node) => ({
    id: node.id,
    position: { x: node.x, y: node.y },
    size: { width: node.width, height: node.height }
  }))

  FigmaPluginMessageTool.postMessage(
    selectionList.length == 2
      ? {
        event: "select_node",
        firstNode: first,
        secondNode: second
      }
      : {
        event: 'unselect_node'
      }
  )
})

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
