/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  Button,
  DocumentLoadEvent,
  PdfJs,
  Position,
  Tooltip,
  Viewer,
} from "@react-pdf-viewer/core";
import {
  HighlightArea,
  highlightPlugin,
  MessageIcon,
  RenderHighlightTargetProps,
  RenderHighlightsProps,
} from "@react-pdf-viewer/highlight";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import Formily from "./Formily";
import {
  Collapse,
  Divider,
  Button as AntButton,
  Flex,
  Tag,
  Tooltip as AntTooltip,
  Popconfirm,
  // Popover,
  // Select,
} from "antd";
import { useEffect } from "react";
import { schema } from "./schema";
import {
  AimOutlined,
  BlockOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  // MenuOutlined,
} from "@ant-design/icons";
import { MoveableContainer } from "./MoveableContainer/MoveableContainer";

const COLOR_COLLECTION = [
  "#5470c6", // 蓝色
  "#91cc75", // 绿色
  "#fac858", // 黄色
  "#ee6666", // 红色
  "#73c0de", // 浅蓝色
  "#3ba272", // 深绿色
  "#fc8452", // 橙色
  "#9a60b4", // 紫色
  "#ea7ccc", // 粉色
];

const getNewColor = (colors: string[]) => {
  const colorSet = new Set(
    colors.length < 9
      ? colors
      : colors.slice(colors.length - COLOR_COLLECTION.length, colors.length)
  );
  for (const color of COLOR_COLLECTION) {
    if (!colorSet.has(color)) {
      return color;
    }
  }
  return COLOR_COLLECTION[colors.length % COLOR_COLLECTION.length];
};

interface Note {
  id: string;
  // values: any;
  highlightAreas: HighlightArea[];
  quote: string;
}

interface HighlightExampleProps {
  fileUrl: string;
  initialReactions?: Reaction[];
}

interface Reaction {
  color: string;
  id: string;
  hidden: boolean;
  value: any;
  notes: Note[];
}

const getRandomString = () =>
  `${new Date().valueOf()}-${(Math.random() * 1e16).toString(32).slice(0, 5)}`;

const HighlightExample: React.FC<HighlightExampleProps> = ({ fileUrl, initialReactions }) => {
  const [currentSelected, setCurrentSelected] = React.useState<string>();
  // const [selectedNote, setSelectedNote] = React.useState<string>();
  const [reactions, setReactions] = React.useState<Reaction[]>(initialReactions || []);

  const noteEles: Map<string, HTMLElement> = new Map();
  const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem("reactions", JSON.stringify(reactions));
  }, [reactions]);

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
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: 1,
      }}
    >
      {currentSelected && (
        <Tooltip
          position={Position.TopCenter}
          target={
            <Button
              onClick={() => {
                // console.log('props:', props);
                const note: Note = {
                  // Increase the id manually
                  id: `note-${getRandomString()}`,
                  highlightAreas: props.highlightAreas,
                  quote: props.selectedText,
                };
                const newReactions = reactions.map((r) => {
                  if (r.id === currentSelected) {
                    return {
                      ...r,
                      notes: r.notes.concat([note]),
                    };
                  }
                  return r;
                });
                setReactions(newReactions);
                navigator.clipboard.writeText(note.quote);
              }}
            >
              <MessageIcon />
            </Button>
          }
          content={() => <div style={{ width: "100px" }}>Add text</div>}
          offset={{ left: 0, top: -8 }}
        />
      )}
    </div>
  );


  // Render for pdf-viewer toolbar
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
      {reactions
        .filter((r) => !r.hidden)
        .map((r) => {
          const { notes, color } = r;
          return notes.map((note) => (
            <React.Fragment key={note.id}>
              {note.highlightAreas
                .filter((area) => area.pageIndex === props.pageIndex)
                .map((area, idx) => (
                  <div
                    key={idx}
                    style={Object.assign(
                      {},
                      {
                        background: color,
                        opacity: 0.35,
                      },
                      props.getCssProperties(area, props.rotation)
                    )}
                    // onClick={() => {
                    //   setSelectedNote(note.id);
                    //   console.log("noteEles:", noteEles);
                    // }}
                    // ref={(ref): void => {
                    //   // Update the map
                    //   noteEles.set(note.id, ref as HTMLElement);
                    // }}
                  >
                    {/* {arr.length - 1 === idx && <Popover
                      content={<>
                        <Select
                          value={r.id}
                          onChange={value => {
                            const newReactions = reactions.map((reaction) => {
                              if (r.id === reaction.id) {
                                return {
                                  ...reaction,
                                  notes: reaction.notes.filter(n => n.id !== note.id),
                                };
                              }
                              if (value === reaction.id) {
                                return {
                                  ...reaction,
                                  notes: reaction.notes.concat([note]),
                                };
                              }
                              return reaction;
                            });
                            setReactions(newReactions);
                          }}
                          options={reactions.map((r) => ({label: r.id, value: r.id}))}
                        />
                        <AntButton
                          onClick={() => {
                            const newReactions = reactions.map((reaction) => {
                              if (r.id === reaction.id) {
                                return {
                                  ...reaction,
                                  notes: reaction.notes.filter(n => n.id !== note.id),
                                };
                              }
                              return reaction;
                            });
                            setReactions(newReactions);
                          }}
                          icon={<DeleteOutlined />}
                        />
                      </>}
                      open={selectedNote === note.id}
                      title="Change annotation"
                      trigger="click"
                    >
                      <AntButton id="asdfjhweiufas" style={{position: "fixed"}} type="primary" icon={<MenuOutlined />} />
                    </Popover>}
                     */}
                  </div>
                ))}
            </React.Fragment>
          ));
        })}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    // renderHighlightContent,
    renderHighlights,
  });

  const { jumpToHighlightArea } = highlightPluginInstance;

  React.useEffect(() => {
    if (!currentSelected && reactions.length > 0) {
      setCurrentSelected(reactions[0].id);
    }
    return () => {
      noteEles.clear();
    };
  }, []);

  const currentReactionIndex = reactions.findIndex(
    (r) => r.id === currentSelected
  );
  const currentReactionColor =
    currentReactionIndex !== -1 ? reactions[currentReactionIndex].color : "";

  const createNewReaction = (value?: any) => {
    const newReactions = reactions.concat([
      {
        color: getNewColor(reactions.map((r) => r.color)),
        id: `reaction-${getRandomString()}`,
        hidden: false,
        notes: [],
        value: value || {},
      },
    ]);
    setReactions(newReactions);
    setCurrentSelected(newReactions[newReactions.length - 1].id);
  }

  const handleChange = (value: Record<string, any>, r_id: string) => {
    // the reactions is the old state
    // so get latest state from local storage
    // TODO: find the reason and avoid using local storage
    const storeReactions: any[] = JSON.parse(localStorage.getItem("reactions") || "[]");
    const newReactions = storeReactions.map((reaction) => {
      if (r_id === reaction.id) {
        return {
          ...reaction,
          value,
        };
      }
      return reaction;
    });
    setReactions(newReactions);
  };

  return (
    <div
      style={{
        // overflow: "hidden",
        maxWidth: "100%",
        height: "75vh",
      }}
    >
      <MoveableContainer direction="row" movingWrapper={true}>
        <div style={{ height: "75vh" }}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}
            onDocumentLoad={handleDocumentLoad}
          />
        </div>
        <div
          style={{
            height: "75vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Flex
            align="center"
            gap={"4px"}
            style={{
              fontSize: "16px",
              flexGrow: 0,
              paddingLeft: "16px",
              userSelect: "none",
            }}
          >
            <strong>Current Annotation:</strong>
            {currentReactionColor && (
              <>
                <div
                  style={{
                    display: "inline-block",
                    width: "1em",
                    height: "1em",
                    backgroundColor: currentReactionColor,
                  }}
                ></div>
                <span>Reaction #{currentReactionIndex + 1}</span>
              </>
            )}
          </Flex>
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <Collapse
              items={reactions.map((r, ind) => {
                return {
                  key: r.id,
                  label: (
                    <div style={{ maxWidth: "100%", userSelect: "none" }}>
                      <div
                        style={{
                          display: "inline-block",
                          width: "1em",
                          height: "1em",
                          backgroundColor: r.color,
                        }}
                      ></div>{" "}
                      Reaction #{ind + 1}
                    </div>
                  ),
                  extra: (
                    <>
                      <AntTooltip title={"Show/hidden annotation"}>
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                            const newReactions = reactions.map((reaction) => {
                              if (r.id === reaction.id) {
                                return {
                                  ...reaction,
                                  hidden: !reaction.hidden,
                                };
                              }
                              return reaction;
                            });
                            setReactions(newReactions);
                          }}
                          icon={
                            !r.hidden ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                        />
                      </AntTooltip>
                      <AntTooltip title={"Set annotation"}>
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                            setCurrentSelected(r.id);
                          }}
                          icon={<AimOutlined spin={r.id === currentSelected} />}
                        />
                      </AntTooltip>
                      <AntTooltip title={"Clone reaction"}>
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                            createNewReaction(r.value);
                          }}
                          icon={<BlockOutlined />}
                        />
                      </AntTooltip>
                      <Popconfirm
                        title="Delete reaction"
                        description="Are you sure to delete this reaction?"
                        onConfirm={() => {
                          const newReactions = reactions.filter(
                            (reaction) => r.id !== reaction.id
                          );
                          setReactions(newReactions);
                          if (currentSelected === r.id) {
                            setCurrentSelected(newReactions[0]?.id);
                          }
                        }}
                        onCancel={(event) => {
                          event?.stopPropagation();
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <AntButton
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          icon={<DeleteOutlined />}
                        />
                      </Popconfirm>
                    </>
                  ),
                  children: (
                    <>
                      <Flex gap="4px 0" wrap>
                        {r.notes.map((note, ind) => (
                          <AntTooltip title={note.quote} key={note.id}>
                            <Tag
                              key={note.id}
                              color={r.color}
                              onClick={() =>
                                jumpToHighlightArea(note.highlightAreas[0])
                              }
                              closable
                              style={{ cursor: "pointer", userSelect: "none" }}
                              onClose={() => {
                                const newNotes = r.notes.filter(
                                  (n) => n.id !== note.id
                                );
                                const newReactions = reactions.map(
                                  (reaction) => {
                                    if (r.id === reaction.id) {
                                      return {
                                        ...reaction,
                                        notes: newNotes,
                                      };
                                    }
                                    return reaction;
                                  }
                                );
                                setReactions(newReactions);
                              }}
                            >
                              #{ind + 1}:{" "}
                              {note.quote.length > 23
                                ? `${note.quote.slice(0, 20)}...`
                                : note.quote}
                            </Tag>
                          </AntTooltip>
                        ))}
                      </Flex>
                      <Divider />
                      <Formily
                        schema={schema}
                        value={r.value || {}}
                        onChange={value => handleChange(value, r.id)}
                      />
                    </>
                  ),
                };
              })}
              // onChange={(keys) => {}}
              // defaultActiveKey={[notes[0]?.id.toString()]}
            />
            <Flex justify="center" style={{ marginTop: "36px" }}>
              <AntButton
                type="primary"
                onClick={() => createNewReaction()}
              >
                Add reaction
              </AntButton>
            </Flex>
          </div>
        </div>
      </MoveableContainer>
    </div>
  );
};

export default HighlightExample;
