import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, readOnly = false }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const toolbar = readOnly ? null : (
    <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-2">
      <button
        type="button"
        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        onClick={() => execCommand('bold')}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        onClick={() => execCommand('italic')}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        onClick={() => execCommand('underline')}
        title="Underline"
      >
        <u>U</u>
      </button>
      <div className="border-l border-gray-300 mx-1"></div>
      <button
        type="button"
        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        onClick={() => execCommand('insertUnorderedList')}
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        onClick={() => execCommand('insertOrderedList')}
        title="Numbered List"
      >
        1. List
      </button>
      <div className="border-l border-gray-300 mx-1"></div>
      <select
        className="px-2 py-1 text-sm border border-gray-300 rounded"
        onChange={(e) => execCommand('formatBlock', e.target.value)}
        title="Heading"
      >
        <option value="div">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>
      <button
        type="button"
        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        onClick={() => execCommand('removeFormat')}
        title="Clear Formatting"
      >
        Clear
      </button>
    </div>
  );

  return (
    <div className="border border-gray-300 rounded-md">
      {toolbar}
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        className="min-h-[100px] p-3 border-t border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-b-md"
        onInput={handleInput}
        style={{
          minHeight: '100px',
          backgroundColor: readOnly ? '#f9fafb' : 'white'
        }}
      />
    </div>
  );
};

export default RichTextEditor;
