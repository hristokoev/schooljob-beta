'use client'

import React, { useEffect, useRef } from 'react'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import theme from './theme'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import './styles.css'

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [], // Add any necessary nodes here
  onError(error: any) {
    console.error(error)
  },
  theme: theme,
}

function OnChangePlugin({ onChange }: { onChange: (editorState: any) => void }) {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }, [editor, onChange])
  return null
}

type LexicalEditorProps = {
  onChange: (value: any) => void
  value: any
}

const EditorContent: React.FC<LexicalEditorProps> = ({ onChange, value }) => {
  const [editor] = useLexicalComposerContext()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initializedRef.current && value) {
      initializedRef.current = true
      try {
        const parsedState = editor.parseEditorState(JSON.stringify(value))
        editor.setEditorState(parsedState)
      } catch (error) {
        console.error('Failed to parse editor state:', error)
      }
    }
  }, [editor, value])

  return (
    <div className="editor-container">
      <ToolbarPlugin />
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder=""
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </div>
  )
}

const LexicalEditor: React.FC<LexicalEditorProps> = ({ onChange, value }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorContent onChange={onChange} value={value} />
    </LexicalComposer>
  )
}

export { LexicalEditor }
