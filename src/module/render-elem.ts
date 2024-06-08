/**
 * @description render elem
 * @author wangfupeng
 */

import { h, VNode } from 'snabbdom'
import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor'
import { MentionElement } from './custom-types'

function renderMention(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  // 当前节点是否选中
  const selected = DomEditor.isNodeSelected(editor, elem)
  const { value = '', info } = elem as MentionElement

  const vnode1 = h(
    'span',
    {
      style: {
        display: 'inline-block',
        width: '1em',
        height: '1em',
        marginRight: '0.1em',
        minWidth: '0',
        minHeight: '0',
        cursor: 'pointer',
        'vertical-align': 'sub',
      },
      on: {
        click() {
          if (info && info.callback) info.callback()
        },
      },
    },
    [
      h('img', {
        props: {
          src: 'data:image/png;base64,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',
        },
        style: {
          width: '100%',
        },
      }),
    ]
  )

  // 构建 vnode
  const vnode = h(
    'span',
    {
      props: {
        contentEditable: false, // 不可编辑
      },
      style: {
        marginLeft: '3px',
        marginRight: '3px',
        backgroundColor: 'var(--w-e-textarea-slight-bg-color)',
        border: selected // 选中/不选中，样式不一样
          ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
          : '2px solid transparent',
        borderRadius: '3px',
        padding: '0 3px',
      },
    },
    [`@${value}`, vnode1] // 如 `@张三`
  )
  return vnode
}

const conf = {
  type: 'mention', // 节点 type ，重要！！！
  renderElem: renderMention,
}

export default conf
