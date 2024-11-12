import * as React from 'react';
import {
  Button,
  DocumentLoadEvent,
  PdfJs,
  Position,
  Tooltip,
  Viewer,
} from '@react-pdf-viewer/core';
import {
  HighlightArea,
  highlightPlugin,
  MessageIcon,
  RenderHighlightTargetProps,
  RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from '@react-pdf-viewer/toolbar';
import Formily from './Formily';
import {
  Col,
  Collapse,
  Row,
  Typography,
  Divider,
  Button as AntButton,
} from 'antd';
import { useEffect } from 'react';
import { schema } from './schema'

interface Note {
  id: string;
  values: any;
  highlightAreas: HighlightArea[];
  quote: string;
}

interface HighlightExampleProps {
  fileUrl: string;
}

const HighlightExample: React.FC<HighlightExampleProps> = ({ fileUrl }) => {
  const [notes, setNotes] = React.useState<Note[]>(
    localStorage.getItem('notes')
      ? JSON.parse(localStorage.getItem('notes') as string)
      : []
  );
  //   const notesContainerRef = React.useRef<HTMLDivElement | null>(null);
  //   let noteId = notes.length;

  const noteEles: Map<string, HTMLElement> = new Map();
  const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    setCurrentDoc(e.doc);
    if (currentDoc && currentDoc !== e.doc) {
      // User opens new document
      //   setNotes();
    }
  };

  const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
    <div
      style={{
        background: '#eee',
        display: 'flex',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: 'translate(0, 8px)',
        zIndex: 1,
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button
            onClick={() => {
              console.log('props:', props);
              const note: Note = {
                // Increase the id manually
                id: `${new Date().valueOf()}-${(Math.random() * 1e16)
                  .toString(32)
                  .slice(0, 5)}`,
                values: undefined,
                highlightAreas: props.highlightAreas,
                quote: props.selectedText,
              };
              const newNotes = notes.concat([note]);
              setNotes(newNotes);
            }}
          >
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: '100px' }}>Add a reaction</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );

  const jumpToNote = (note: Note) => {
    // activateTab(3);
    // const notesContainer = notesContainerRef.current;
    console.log('jump to note!');
    if (noteEles.has(note.id)) {
      noteEles.get(note.id)?.scrollIntoView();
    }

    // if (noteEles.has(note.id) && notesContainer) {
    //     notesContainer.scrollTop = noteEles.get(note.id).getBoundingClientRect().top;
    // }
  };
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Open: () => <></>,
    Print: () => <></>,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,
    SwitchScrollMode: () => <></>,
    SwitchScrollModeMenuItem: () => <></>,
    RotateBackwardMenuItem: () => <></>,
    RotateForwardMenuItem: () => <></>,
    SwitchViewModeMenuItem: () => <></>,
    SwitchViewMode: () => <></>,
  });

  const renderToolbar = (
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>;
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    // renderToolbar: (props) => {
    //     // console.log("props:", props);
    //     return undefined
    // },
    renderToolbar,
    sidebarTabs: () => [],
  });
  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;

  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: 'yellow',
                    opacity: 0.4,
                  },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => jumpToNote(note)}
                ref={(ref): void => {
                  // Update the map
                  noteEles.set(note.id, ref as HTMLElement);
                }}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    // renderHighlightContent,
    renderHighlights,
  });

  const { jumpToHighlightArea } = highlightPluginInstance;

  React.useEffect(() => {
    return () => {
      noteEles.clear();
    };
  }, []);

  return (
    <div
      style={{
        // height: "600px",
        overflow: 'hidden',
        maxWidth: '100%',
        // display: "flex",
        // justifyContent: "space-between",
      }}
    >
      <Row>
        <Col span={12} style={{ maxHeight: '75vh' }}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}
            onDocumentLoad={handleDocumentLoad}
          />
        </Col>
        <Col span={12} style={{ maxHeight: '75vh', overflow: 'auto' }}>
          <Collapse
            items={notes.map((note, ind) => {
              return {
                key: note.id.toString(),
                label: (
                  <div style={{ maxWidth: '100%', userSelect: 'none' }}>
                    <Typography.Text>
                      <strong>Selected {ind + 1}, </strong>
                      {note.quote.slice(0, 80)}...
                    </Typography.Text>
                  </div>
                ),
                children: (
                  <>
                    <div>
                      <strong>Id: </strong>
                      {note.id}
                    </div>
                    <div>
                      <strong>Content: </strong>
                      {note.quote}
                    </div>
                    <AntButton
                      onClick={() =>
                        jumpToHighlightArea(note.highlightAreas[0])
                      }
                    >
                      跳转
                    </AntButton>
                    <AntButton
                      onClick={() => {
                        const newNotes = notes.filter((n) => n.id !== note.id);
                        setNotes(newNotes);
                      }}
                    >
                      删除
                    </AntButton>
                    <Divider />
                    <Formily
                      schema={schema}
                      value={note.values || {}}
                      onChange={(values) => {
                        const newNotes = notes.map((n) => {
                          if (n.id === note.id) {
                            console.log('values:', values, n);
                            return {
                              ...n,
                              values,
                            };
                          }
                          return n;
                        });
                        setNotes(newNotes);
                      }}
                    />
                  </>
                ),
              };
            })}
            // defaultActiveKey={[notes[0]?.id.toString()]}
          />
          ;
        </Col>
      </Row>
    </div>
  );
};

export default HighlightExample;
